using System.ComponentModel.DataAnnotations;

namespace Phynexora.Api.Contracts;

public static class Allowed
{
    public static readonly string[] Services =
    {
        "ERP System", "POS System", "Business Website", "E-commerce Platform", "Web Application", "Mobile Application",
        "Custom Software", "AI & Automation", "API & System Integration", "Database / Cloud Solution", "Maintenance & Support", "Not sure yet",
    };
}

public sealed class EnquiryRequest
{
    [Required, StringLength(100, MinimumLength = 2)] public string FullName { get; set; } = "";
    [StringLength(150)] public string? CompanyName { get; set; }
    [Required, EmailAddress, StringLength(200)] public string Email { get; set; } = "";
    [RegularExpression(@"^\+?[0-9\s\-()]{7,20}$", ErrorMessage = "Please enter a valid phone number.")] public string? WhatsApp { get; set; }
    [StringLength(80)] public string? Country { get; set; }
    [StringLength(80)] public string? Industry { get; set; }
    [Required, StringLength(100)] public string Service { get; set; } = "";
    [StringLength(60)] public string? Budget { get; set; }
    [StringLength(60)] public string? Timeline { get; set; }
    [Required, StringLength(4000, MinimumLength = 20)] public string Description { get; set; } = "";
    [Range(typeof(bool), "true", "true", ErrorMessage = "Consent is required.")] public bool Consent { get; set; }
    public string? TurnstileToken { get; set; }
}

public sealed class FeedbackRequest
{
    [Required, StringLength(100, MinimumLength = 2)] public string Name { get; set; } = "";
    [StringLength(150)] public string? Company { get; set; }
    [StringLength(100)] public string? Role { get; set; }
    [Range(1, 5)] public int Rating { get; set; }
    [Required, StringLength(2000, MinimumLength = 20)] public string Feedback { get; set; } = "";
    public bool ConsentToPublish { get; set; }
    public string? TurnstileToken { get; set; }
}

public sealed class ChatLeadRequest
{
    [Required, StringLength(100)] public string Intent { get; set; } = "";
    [Required, StringLength(100, MinimumLength = 2)] public string Name { get; set; } = "";
    [StringLength(150)] public string? Company { get; set; }
    [Required, EmailAddress, StringLength(200)] public string Email { get; set; } = "";
    [RegularExpression(@"^\+?[0-9\s\-()]{7,20}$")] public string? WhatsApp { get; set; }
    [Required, StringLength(100)] public string Service { get; set; } = "";
    [Required, StringLength(3000, MinimumLength = 5)] public string Description { get; set; } = "";
    [MaxLength(60)] public List<TranscriptLine>? Transcript { get; set; }
}

public sealed class TranscriptLine
{
    [Required, RegularExpression("^(bot|user)$")] public string Role { get; set; } = "";
    [Required, StringLength(3000)] public string Text { get; set; } = "";
}

public sealed class ChatMessageRequest
{
    [Required, MinLength(1), MaxLength(30)] public List<ChatTurn> Messages { get; set; } = new();
}

public sealed class ChatTurn
{
    [Required, RegularExpression("^(user|assistant)$")] public string Role { get; set; } = "";
    [Required, StringLength(2000, MinimumLength = 1)] public string Content { get; set; } = "";
}

public sealed class UpdateEnquiryStatusRequest
{
    [Required] public string Status { get; set; } = "";
    [StringLength(4000)] public string? InternalNotes { get; set; }
}

public sealed class ReviewFeedbackRequest
{
    [StringLength(100)] public string? ReviewedBy { get; set; }
}

public sealed record TestimonialDto(Guid Id, string Name, string? Company, string? Role, int Rating, string Feedback);
public sealed record CreatedDto(bool Ok, string? Reference = null);
public sealed record ChatReplyDto(string Reply);
