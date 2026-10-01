using Phynexora.Api.Contracts;
using Phynexora.Api.Data;
using Phynexora.Api.Domain;
using Phynexora.Api.Security;
using Phynexora.Api.Services;

namespace Phynexora.Api.Endpoints;

/// <summary>
/// Admin API used to review enquiries, chatbot leads and feedback (approve / reject testimonials).
/// A future admin panel (or tools like Postman) calls these with the X-Admin-Key header.
/// </summary>
public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this IEndpointRouteBuilder app)
    {
        var admin = app.MapGroup("/api/admin").AddEndpointFilter<AdminKeyFilter>().RequireRateLimiting("admin");

        // Enquiries
        admin.MapGet("/enquiries", async (IRepository<Enquiry> repo, string? status, int page = 1, int pageSize = 25, CancellationToken ct = default) =>
        {
            (page, pageSize) = Clamp(page, pageSize);
            EnquiryStatus? s = Enum.TryParse<EnquiryStatus>(status, true, out var parsed) ? parsed : null;
            var result = await repo.ListAsync(q => (s is null ? q : q.Where(e => e.Status == s)).OrderByDescending(e => e.CreatedAt), page, pageSize, ct);
            return Results.Ok(result);
        });

        admin.MapGet("/enquiries/{id:guid}", async (Guid id, IRepository<Enquiry> repo, CancellationToken ct) =>
            await repo.GetAsync(id, ct) is { } e ? Results.Ok(e) : Results.NotFound());

        admin.MapPatch("/enquiries/{id:guid}", async (Guid id, UpdateEnquiryStatusRequest req, IRepository<Enquiry> repo, CancellationToken ct) =>
        {
            if (Validation.Validate(req) is { } errors) return Results.ValidationProblem(errors);
            if (!Enum.TryParse<EnquiryStatus>(req.Status, true, out var status))
                return Results.ValidationProblem(new Dictionary<string, string[]> { ["Status"] = new[] { $"Use one of: {string.Join(", ", Enum.GetNames<EnquiryStatus>())}" } });
            var e = await repo.GetAsync(id, ct);
            if (e is null) return Results.NotFound();
            e.Status = status;
            if (req.InternalNotes is not null) e.InternalNotes = Sanitizer.Clean(req.InternalNotes, 4000);
            e.UpdatedAt = DateTimeOffset.UtcNow;
            await repo.UpdateAsync(e, ct);
            return Results.Ok(e);
        });

        admin.MapGet("/enquiries/{id:guid}/attachment", async (Guid id, IRepository<Enquiry> repo, IFileStorage files, CancellationToken ct) =>
        {
            var e = await repo.GetAsync(id, ct);
            if (e?.AttachmentStoredName is null) return Results.NotFound();
            var stream = files.OpenRead(e.AttachmentStoredName);
            return stream is null
                ? Results.NotFound()
                : Results.File(stream, e.AttachmentContentType ?? "application/octet-stream", e.AttachmentOriginalName ?? e.AttachmentStoredName);
        });

        // Chatbot leads
        admin.MapGet("/chat-leads", async (IRepository<ChatLead> repo, int page = 1, int pageSize = 25, CancellationToken ct = default) =>
        {
            (page, pageSize) = Clamp(page, pageSize);
            return Results.Ok(await repo.ListAsync(q => q.OrderByDescending(l => l.CreatedAt), page, pageSize, ct));
        });

        // Feedback moderation
        admin.MapGet("/feedback", async (IRepository<Feedback> repo, string? status, int page = 1, int pageSize = 25, CancellationToken ct = default) =>
        {
            (page, pageSize) = Clamp(page, pageSize);
            var s = Enum.TryParse<FeedbackStatus>(status, true, out var parsed) ? parsed : FeedbackStatus.Pending;
            return Results.Ok(await repo.ListAsync(q => q.Where(f => f.Status == s).OrderByDescending(f => f.CreatedAt), page, pageSize, ct));
        });

        admin.MapPost("/feedback/{id:guid}/approve", (Guid id, ReviewFeedbackRequest? req, IRepository<Feedback> repo, CancellationToken ct) =>
            Review(id, FeedbackStatus.Approved, req?.ReviewedBy, repo, ct));
        admin.MapPost("/feedback/{id:guid}/reject", (Guid id, ReviewFeedbackRequest? req, IRepository<Feedback> repo, CancellationToken ct) =>
            Review(id, FeedbackStatus.Rejected, req?.ReviewedBy, repo, ct));
        admin.MapDelete("/feedback/{id:guid}", async (Guid id, IRepository<Feedback> repo, CancellationToken ct) =>
            await repo.DeleteAsync(id, ct) ? Results.NoContent() : Results.NotFound());
    }

    private static async Task<IResult> Review(Guid id, FeedbackStatus status, string? by, IRepository<Feedback> repo, CancellationToken ct)
    {
        var f = await repo.GetAsync(id, ct);
        if (f is null) return Results.NotFound();
        if (status == FeedbackStatus.Approved && !f.ConsentToPublish)
            return Results.Conflict(new { message = "This person did not consent to publication." });
        f.Status = status;
        f.ReviewedAt = DateTimeOffset.UtcNow;
        f.ReviewedBy = Sanitizer.Clean(by, 100) ?? "admin";
        await repo.UpdateAsync(f, ct);
        return Results.Ok(f);
    }

    private static (int, int) Clamp(int page, int size) => (Math.Max(1, page), Math.Clamp(size, 1, 100));
}
