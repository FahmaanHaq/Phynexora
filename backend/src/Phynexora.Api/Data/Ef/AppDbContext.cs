using Microsoft.EntityFrameworkCore;
using Phynexora.Api.Domain;

namespace Phynexora.Api.Data.Ef;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Enquiry> Enquiries => Set<Enquiry>();
    public DbSet<Feedback> Feedback => Set<Feedback>();
    public DbSet<ChatLead> ChatLeads => Set<ChatLead>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Enquiry>(e =>
        {
            e.ToTable("Enquiries");
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.Reference).IsUnique();
            e.HasIndex(x => new { x.Status, x.CreatedAt });
            e.Property(x => x.Reference).HasMaxLength(20).IsRequired();
            e.Property(x => x.FullName).HasMaxLength(100).IsRequired();
            e.Property(x => x.CompanyName).HasMaxLength(150);
            e.Property(x => x.Email).HasMaxLength(200).IsRequired();
            e.Property(x => x.WhatsApp).HasMaxLength(25);
            e.Property(x => x.Country).HasMaxLength(80);
            e.Property(x => x.Industry).HasMaxLength(80);
            e.Property(x => x.Service).HasMaxLength(100).IsRequired();
            e.Property(x => x.Budget).HasMaxLength(60);
            e.Property(x => x.Timeline).HasMaxLength(60);
            e.Property(x => x.Description).HasMaxLength(4000).IsRequired();
            e.Property(x => x.AttachmentStoredName).HasMaxLength(100);
            e.Property(x => x.AttachmentOriginalName).HasMaxLength(150);
            e.Property(x => x.AttachmentContentType).HasMaxLength(150);
            e.Property(x => x.InternalNotes).HasMaxLength(4000);
            e.Property(x => x.ClientIpHash).HasMaxLength(64);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        });

        b.Entity<Feedback>(e =>
        {
            e.ToTable("Feedback");
            e.HasKey(x => x.Id);
            e.HasIndex(x => new { x.Status, x.CreatedAt });
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.Property(x => x.Company).HasMaxLength(150);
            e.Property(x => x.Role).HasMaxLength(100);
            e.Property(x => x.Text).HasMaxLength(2000).IsRequired();
            e.Property(x => x.ReviewedBy).HasMaxLength(100);
            e.Property(x => x.ClientIpHash).HasMaxLength(64);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
            e.ToTable(t => t.HasCheckConstraint("CK_Feedback_Rating", "[Rating] BETWEEN 1 AND 5"));
        });

        b.Entity<ChatLead>(e =>
        {
            e.ToTable("ChatLeads");
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.Reference).IsUnique();
            e.Property(x => x.Reference).HasMaxLength(20).IsRequired();
            e.Property(x => x.Intent).HasMaxLength(100).IsRequired();
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.Property(x => x.Company).HasMaxLength(150);
            e.Property(x => x.Email).HasMaxLength(200).IsRequired();
            e.Property(x => x.WhatsApp).HasMaxLength(25);
            e.Property(x => x.Service).HasMaxLength(100).IsRequired();
            e.Property(x => x.Description).HasMaxLength(3000).IsRequired();
            e.Property(x => x.ClientIpHash).HasMaxLength(64);
            e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        });
    }
}
