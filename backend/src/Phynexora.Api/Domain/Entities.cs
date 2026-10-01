namespace Phynexora.Api.Domain;

public interface IEntity
{
    Guid Id { get; set; }
    DateTimeOffset CreatedAt { get; set; }
}

public enum EnquiryStatus { New, InReview, Contacted, Proposal, Won, Closed, Spam }
public enum FeedbackStatus { Pending, Approved, Rejected }
public enum LeadStatus { New, Contacted, Converted, Closed }

public sealed class Enquiry : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public string Reference { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string? CompanyName { get; set; }
    public string Email { get; set; } = default!;
    public string? WhatsApp { get; set; }
    public string? Country { get; set; }
    public string? Industry { get; set; }
    public string Service { get; set; } = default!;
    public string? Budget { get; set; }
    public string? Timeline { get; set; }
    public string Description { get; set; } = default!;
    public string? AttachmentStoredName { get; set; }
    public string? AttachmentOriginalName { get; set; }
    public string? AttachmentContentType { get; set; }
    public long? AttachmentSize { get; set; }
    public EnquiryStatus Status { get; set; } = EnquiryStatus.New;
    public string? InternalNotes { get; set; }
    public string? ClientIpHash { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}

public sealed class Feedback : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public string Name { get; set; } = default!;
    public string? Company { get; set; }
    public string? Role { get; set; }
    public int Rating { get; set; }
    public string Text { get; set; } = default!;
    public bool ConsentToPublish { get; set; }
    /// <summary>All new feedback starts as Pending and is never public until Approved.</summary>
    public FeedbackStatus Status { get; set; } = FeedbackStatus.Pending;
    public DateTimeOffset? ReviewedAt { get; set; }
    public string? ReviewedBy { get; set; }
    public string? ClientIpHash { get; set; }
}

public sealed class ChatLead : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public string Reference { get; set; } = default!;
    public string Intent { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Company { get; set; }
    public string Email { get; set; } = default!;
    public string? WhatsApp { get; set; }
    public string Service { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string? TranscriptJson { get; set; }
    public LeadStatus Status { get; set; } = LeadStatus.New;
    public string? ClientIpHash { get; set; }
}
