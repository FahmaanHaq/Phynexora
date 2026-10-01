using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Phynexora.Api.Services;

public static partial class Sanitizer
{
    [GeneratedRegex(@"<[^>]*>")] private static partial Regex Tags();
    [GeneratedRegex(@"[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]")] private static partial Regex Control();

    /// <summary>Trims, removes HTML tags / control characters and enforces a max length.</summary>
    public static string? Clean(string? value, int max)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        var v = Control().Replace(Tags().Replace(value, ""), "").Replace("<", "").Replace(">", "").Trim();
        return v.Length > max ? v[..max] : v;
    }

    public static string Required(string value, int max) => Clean(value, max) ?? "";

    /// <summary>Stores a salted hash of the client IP for abuse tracking without keeping the raw IP.</summary>
    public static string HashIp(string? ip, string salt)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes($"{salt}:{ip}"));
        return Convert.ToHexString(bytes)[..32];
    }

    public static string NewReference(string prefix)
    {
        Span<byte> b = stackalloc byte[4];
        RandomNumberGenerator.Fill(b);
        return $"{prefix}-{DateTime.UtcNow:yyMMdd}-{Convert.ToHexString(b)[..6]}";
    }
}
