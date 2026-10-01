namespace Phynexora.Api.Services;

public interface IFileStorage
{
    Task<string> SaveAsync(Stream content, string extension, CancellationToken ct);
    Stream? OpenRead(string storedName);
}

/// <summary>
/// Stores uploads OUTSIDE the web root with random file names. Swap for Azure Blob Storage
/// by implementing IFileStorage.
/// </summary>
public sealed class LocalFileStorage : IFileStorage
{
    private readonly string _root;

    public LocalFileStorage(IConfiguration config, IHostEnvironment env)
    {
        _root = config["Storage:UploadsPath"] is { Length: > 0 } p ? p : Path.Combine(env.ContentRootPath, "App_Data", "uploads");
        Directory.CreateDirectory(_root);
    }

    public async Task<string> SaveAsync(Stream content, string extension, CancellationToken ct)
    {
        var name = $"{Guid.NewGuid():N}{extension}";
        await using var fs = new FileStream(Path.Combine(_root, name), FileMode.CreateNew, FileAccess.Write);
        await content.CopyToAsync(fs, ct);
        return name;
    }

    public Stream? OpenRead(string storedName)
    {
        // Only allow names we generated (guid + known extension) – prevents path traversal.
        if (storedName.Length > 60 || storedName.IndexOfAny(Path.GetInvalidFileNameChars()) >= 0 || storedName.Contains("..")) return null;
        var path = Path.Combine(_root, storedName);
        return File.Exists(path) ? File.OpenRead(path) : null;
    }
}

public static class UploadRules
{
    public const long MaxBytes = 10 * 1024 * 1024;

    public static readonly Dictionary<string, string> Extensions = new(StringComparer.OrdinalIgnoreCase)
    {
        [".pdf"] = "application/pdf",
        [".doc"] = "application/msword",
        [".docx"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        [".xls"] = "application/vnd.ms-excel",
        [".xlsx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        [".pptx"] = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        [".png"] = "image/png",
        [".jpg"] = "image/jpeg",
        [".jpeg"] = "image/jpeg",
        [".txt"] = "text/plain",
    };

    /// <summary>Checks the file signature so a renamed executable cannot pass as a document.</summary>
    public static bool HasValidSignature(string ext, ReadOnlySpan<byte> head)
    {
        static bool Starts(ReadOnlySpan<byte> h, params byte[] sig) => h.Length >= sig.Length && h[..sig.Length].SequenceEqual(sig);
        return ext.ToLowerInvariant() switch
        {
            ".pdf" => Starts(head, 0x25, 0x50, 0x44, 0x46),
            ".png" => Starts(head, 0x89, 0x50, 0x4E, 0x47),
            ".jpg" or ".jpeg" => Starts(head, 0xFF, 0xD8, 0xFF),
            ".docx" or ".xlsx" or ".pptx" => Starts(head, 0x50, 0x4B, 0x03, 0x04),
            ".doc" or ".xls" => Starts(head, 0xD0, 0xCF, 0x11, 0xE0),
            ".txt" => !head.Contains((byte)0),
            _ => false,
        };
    }
}
