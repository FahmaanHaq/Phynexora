-- Phynexora API — SQL Server schema (matches Data/Ef/AppDbContext.cs)
-- Option A: run this script once against an empty database.
-- Option B: let EF Core create it (Database__AutoMigrate=true) or use migrations:
--   dotnet tool install --global dotnet-ef
--   dotnet ef migrations add InitialCreate -p src/Phynexora.Api
--   dotnet ef database update -p src/Phynexora.Api

CREATE TABLE dbo.Enquiries (
    Id                      UNIQUEIDENTIFIER   NOT NULL PRIMARY KEY,
    CreatedAt               DATETIMEOFFSET     NOT NULL,
    Reference               NVARCHAR(20)       NOT NULL,
    FullName                NVARCHAR(100)      NOT NULL,
    CompanyName             NVARCHAR(150)      NULL,
    Email                   NVARCHAR(200)      NOT NULL,
    WhatsApp                NVARCHAR(25)       NULL,
    Country                 NVARCHAR(80)       NULL,
    Industry                NVARCHAR(80)       NULL,
    Service                 NVARCHAR(100)      NOT NULL,
    Budget                  NVARCHAR(60)       NULL,
    Timeline                NVARCHAR(60)       NULL,
    Description             NVARCHAR(4000)     NOT NULL,
    AttachmentStoredName    NVARCHAR(100)      NULL,
    AttachmentOriginalName  NVARCHAR(150)      NULL,
    AttachmentContentType   NVARCHAR(150)      NULL,
    AttachmentSize          BIGINT             NULL,
    Status                  NVARCHAR(20)       NOT NULL DEFAULT 'New',
    InternalNotes           NVARCHAR(4000)     NULL,
    ClientIpHash            NVARCHAR(64)       NULL,
    UpdatedAt               DATETIMEOFFSET     NULL
);
CREATE UNIQUE INDEX IX_Enquiries_Reference ON dbo.Enquiries (Reference);
CREATE INDEX IX_Enquiries_Status_CreatedAt ON dbo.Enquiries (Status, CreatedAt);

CREATE TABLE dbo.Feedback (
    Id                UNIQUEIDENTIFIER   NOT NULL PRIMARY KEY,
    CreatedAt         DATETIMEOFFSET     NOT NULL,
    Name              NVARCHAR(100)      NOT NULL,
    Company           NVARCHAR(150)      NULL,
    Role              NVARCHAR(100)      NULL,
    Rating            INT                NOT NULL CONSTRAINT CK_Feedback_Rating CHECK (Rating BETWEEN 1 AND 5),
    Text              NVARCHAR(2000)     NOT NULL,
    ConsentToPublish  BIT                NOT NULL,
    Status            NVARCHAR(20)       NOT NULL DEFAULT 'Pending',
    ReviewedAt        DATETIMEOFFSET     NULL,
    ReviewedBy        NVARCHAR(100)      NULL,
    ClientIpHash      NVARCHAR(64)       NULL
);
CREATE INDEX IX_Feedback_Status_CreatedAt ON dbo.Feedback (Status, CreatedAt);

CREATE TABLE dbo.ChatLeads (
    Id              UNIQUEIDENTIFIER   NOT NULL PRIMARY KEY,
    CreatedAt       DATETIMEOFFSET     NOT NULL,
    Reference       NVARCHAR(20)       NOT NULL,
    Intent          NVARCHAR(100)      NOT NULL,
    Name            NVARCHAR(100)      NOT NULL,
    Company         NVARCHAR(150)      NULL,
    Email           NVARCHAR(200)      NOT NULL,
    WhatsApp        NVARCHAR(25)       NULL,
    Service         NVARCHAR(100)      NOT NULL,
    Description     NVARCHAR(3000)     NOT NULL,
    TranscriptJson  NVARCHAR(MAX)      NULL,
    Status          NVARCHAR(20)       NOT NULL DEFAULT 'New',
    ClientIpHash    NVARCHAR(64)       NULL
);
CREATE UNIQUE INDEX IX_ChatLeads_Reference ON dbo.ChatLeads (Reference);
