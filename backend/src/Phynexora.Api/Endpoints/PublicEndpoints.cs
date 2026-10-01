using System.Text.Json;
using Phynexora.Api.Contracts;
using Phynexora.Api.Data;
using Phynexora.Api.Domain;
using Phynexora.Api.Security;
using Phynexora.Api.Services;

namespace Phynexora.Api.Endpoints;

public static class PublicEndpoints
{
    public static void MapPublicEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").AddEndpointFilter<ClientKeyFilter>();

        api.MapPost("/enquiries", CreateEnquiry).RequireRateLimiting("forms").DisableAntiforgery();
        api.MapPost("/feedback", CreateFeedback).RequireRateLimiting("forms");
        api.MapPost("/chat/leads", CreateChatLead).RequireRateLimiting("forms");
        api.MapPost("/chat/message", ChatMessage).RequireRateLimiting("chat");

        // Read-only, public: approved testimonials only.
        app.MapGet("/api/testimonials", GetTestimonials).RequireRateLimiting("read");
    }

    private static string Salt(IConfiguration c) => c["Security:IpHashSalt"] ?? "phynexora";

    private static async Task<IResult> CreateEnquiry(
        HttpContext http, IRepository<Enquiry> repo, IFileStorage files, IHumanVerifier human, INotifier notify,
        IConfiguration config, ILogger<Enquiry> log, CancellationToken ct)
    {
        if (!http.Request.HasFormContentType) return Results.BadRequest(new { message = "Expected multipart/form-data." });
        var form = await http.Request.ReadFormAsync(ct);
        string? F(string k) => form.TryGetValue(k, out var v) ? v.ToString() : null;

        var req = new EnquiryRequest
        {
            FullName = F("fullName") ?? "",
            CompanyName = F("companyName"),
            Email = (F("email") ?? "").Trim().ToLowerInvariant(),
            WhatsApp = string.IsNullOrWhiteSpace(F("whatsapp")) ? null : F("whatsapp"),
            Country = F("country"),
            Industry = F("industry"),
            Service = F("service") ?? "",
            Budget = F("budget"),
            Timeline = F("timeline"),
            Description = F("description") ?? "",
            Consent = string.Equals(F("consent"), "true", StringComparison.OrdinalIgnoreCase),
            TurnstileToken = F("turnstileToken"),
        };

        var errors = Validation.Validate(req) ?? new Dictionary<string, string[]>();
        if (!Allowed.Services.Contains(req.Service)) errors["Service"] = new[] { "Please choose a valid service." };
        if (errors.Count > 0) return Results.ValidationProblem(errors);

        var ip = ClientIp.Get(http, config);
        if (!await human.VerifyAsync(req.TurnstileToken, ip, ct))
            return Results.ValidationProblem(new Dictionary<string, string[]> { ["form"] = new[] { "Verification failed. Please try again." } });

        var enquiry = new Enquiry
        {
            Reference = Sanitizer.NewReference("PX"),
            FullName = Sanitizer.Required(req.FullName, 100),
            CompanyName = Sanitizer.Clean(req.CompanyName, 150),
            Email = req.Email,
            WhatsApp = Sanitizer.Clean(req.WhatsApp, 25),
            Country = Sanitizer.Clean(req.Country, 80),
            Industry = Sanitizer.Clean(req.Industry, 80),
            Service = req.Service,
            Budget = Sanitizer.Clean(req.Budget, 60),
            Timeline = Sanitizer.Clean(req.Timeline, 60),
            Description = Sanitizer.Required(req.Description, 4000),
            ClientIpHash = Sanitizer.HashIp(ip, Salt(config)),
        };

        var file = form.Files.GetFile("attachment");
        if (file is { Length: > 0 })
        {
            var ext = Path.GetExtension(file.FileName);
            if (file.Length > UploadRules.MaxBytes)
                return Results.ValidationProblem(new Dictionary<string, string[]> { ["attachment"] = new[] { "The file must be 10 MB or smaller." } });
            if (!UploadRules.Extensions.TryGetValue(ext, out var contentType))
                return Results.ValidationProblem(new Dictionary<string, string[]> { ["attachment"] = new[] { "This file type is not allowed." } });

            await using var stream = file.OpenReadStream();
            var head = new byte[8];
            var read = await stream.ReadAsync(head, ct);
            if (!UploadRules.HasValidSignature(ext, head.AsSpan(0, read)))
                return Results.ValidationProblem(new Dictionary<string, string[]> { ["attachment"] = new[] { "The file content does not match its type." } });
            stream.Position = 0;

            enquiry.AttachmentStoredName = await files.SaveAsync(stream, ext.ToLowerInvariant(), ct);
            enquiry.AttachmentOriginalName = Sanitizer.Clean(Path.GetFileName(file.FileName), 150);
            enquiry.AttachmentContentType = contentType;
            enquiry.AttachmentSize = file.Length;
        }

        await repo.AddAsync(enquiry, ct);
        log.LogInformation("Enquiry {Reference} received for {Service}", enquiry.Reference, enquiry.Service);
        _ = notify.NotifyAsync($"New project enquiry {enquiry.Reference}: {enquiry.Service}",
            $"From: {enquiry.FullName} ({enquiry.Email})\nCompany: {enquiry.CompanyName}\nWhatsApp: {enquiry.WhatsApp}\nService: {enquiry.Service}\nBudget: {enquiry.Budget}\nTimeline: {enquiry.Timeline}\n\n{enquiry.Description}",
            CancellationToken.None);

        return Results.Created($"/api/admin/enquiries/{enquiry.Id}", new CreatedDto(true, enquiry.Reference));
    }

    private static async Task<IResult> CreateFeedback(
        HttpContext http, FeedbackRequest req, IRepository<Feedback> repo, IHumanVerifier human, INotifier notify, IConfiguration config, CancellationToken ct)
    {
        if (Validation.Validate(req) is { } errors) return Results.ValidationProblem(errors);
        var ip = ClientIp.Get(http, config);
        if (!await human.VerifyAsync(req.TurnstileToken, ip, ct))
            return Results.ValidationProblem(new Dictionary<string, string[]> { ["form"] = new[] { "Verification failed. Please try again." } });

        var fb = new Feedback
        {
            Name = Sanitizer.Required(req.Name, 100),
            Company = Sanitizer.Clean(req.Company, 150),
            Role = Sanitizer.Clean(req.Role, 100),
            Rating = req.Rating,
            Text = Sanitizer.Required(req.Feedback, 2000),
            ConsentToPublish = req.ConsentToPublish,
            Status = FeedbackStatus.Pending, // never public until approved
            ClientIpHash = Sanitizer.HashIp(ip, Salt(config)),
        };
        await repo.AddAsync(fb, ct);
        _ = notify.NotifyAsync("New feedback awaiting review", $"{fb.Name} ({fb.Company}) rated {fb.Rating}/5:\n\n{fb.Text}", CancellationToken.None);
        return Results.Created($"/api/admin/feedback/{fb.Id}", new CreatedDto(true));
    }

    private static async Task<IResult> CreateChatLead(
        HttpContext http, ChatLeadRequest req, IRepository<ChatLead> repo, INotifier notify, IConfiguration config, CancellationToken ct)
    {
        if (Validation.Validate(req) is { } errors) return Results.ValidationProblem(errors);
        var transcript = req.Transcript?.Select(t => new { role = t.Role, text = Sanitizer.Clean(t.Text, 3000) }).ToList();
        var lead = new ChatLead
        {
            Reference = Sanitizer.NewReference("CL"),
            Intent = Sanitizer.Required(req.Intent, 100),
            Name = Sanitizer.Required(req.Name, 100),
            Company = Sanitizer.Clean(req.Company, 150),
            Email = req.Email.Trim().ToLowerInvariant(),
            WhatsApp = Sanitizer.Clean(req.WhatsApp, 25),
            Service = Sanitizer.Required(req.Service, 100),
            Description = Sanitizer.Required(req.Description, 3000),
            TranscriptJson = transcript is null ? null : JsonSerializer.Serialize(transcript),
            ClientIpHash = Sanitizer.HashIp(ClientIp.Get(http, config), Salt(config)),
        };
        await repo.AddAsync(lead, ct);
        _ = notify.NotifyAsync($"New chatbot lead {lead.Reference}: {lead.Service}", $"{lead.Name} ({lead.Email}, {lead.WhatsApp})\n\n{lead.Description}", CancellationToken.None);
        return Results.Created($"/api/admin/chat-leads/{lead.Id}", new CreatedDto(true, lead.Reference));
    }

    private static async Task<IResult> ChatMessage(ChatMessageRequest req, IChatAssistant assistant, CancellationToken ct)
    {
        if (!assistant.Enabled) return Results.Problem("AI assistant is not configured.", statusCode: 503);
        if (Validation.Validate(req) is { } errors) return Results.ValidationProblem(errors);
        if (req.Messages[^1].Role != "user") return Results.ValidationProblem(new Dictionary<string, string[]> { ["messages"] = new[] { "Last message must be from the user." } });
        var reply = await assistant.ReplyAsync(req.Messages, ct);
        return reply is null ? Results.Problem("The assistant is unavailable.", statusCode: 503) : Results.Ok(new ChatReplyDto(reply));
    }

    private static async Task<IResult> GetTestimonials(IRepository<Feedback> repo, CancellationToken ct)
    {
        var page = await repo.ListAsync(q => q
            .Where(f => f.Status == FeedbackStatus.Approved && f.ConsentToPublish)
            .OrderByDescending(f => f.ReviewedAt ?? f.CreatedAt), 1, 12, ct);
        return Results.Ok(page.Items.Select(f => new TestimonialDto(f.Id, f.Name, f.Company, f.Role, f.Rating, f.Text)));
    }
}
