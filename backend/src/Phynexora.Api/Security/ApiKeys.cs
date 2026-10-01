using System.Security.Cryptography;
using System.Text;

namespace Phynexora.Api.Security;

public static class KeyCompare
{
    public static bool Matches(string? provided, string? expected)
    {
        if (string.IsNullOrEmpty(provided) || string.IsNullOrEmpty(expected)) return false;
        var a = SHA256.HashData(Encoding.UTF8.GetBytes(provided));
        var b = SHA256.HashData(Encoding.UTF8.GetBytes(expected));
        return CryptographicOperations.FixedTimeEquals(a, b);
    }
}

/// <summary>
/// Requires the shared key sent by the Next.js server (X-Api-Key) when Security:ClientApiKey is set.
/// This keeps public write endpoints from being called directly by bots.
/// </summary>
public sealed class ClientKeyFilter(IConfiguration config) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
    {
        var expected = config["Security:ClientApiKey"];
        if (!string.IsNullOrEmpty(expected) && !KeyCompare.Matches(ctx.HttpContext.Request.Headers["X-Api-Key"], expected))
            return Results.Unauthorized();
        return await next(ctx);
    }
}

/// <summary>
/// Protects admin endpoints with X-Admin-Key. Admin is disabled entirely (404) when no key is configured.
/// Replace with ASP.NET Core Identity / Entra ID when a full admin panel is added.
/// </summary>
public sealed class AdminKeyFilter(IConfiguration config, ILogger<AdminKeyFilter> log) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
    {
        var expected = config["Security:AdminApiKey"];
        if (string.IsNullOrEmpty(expected) || expected.Length < 24) return Results.NotFound();
        if (!KeyCompare.Matches(ctx.HttpContext.Request.Headers["X-Admin-Key"], expected))
        {
            log.LogWarning("Rejected admin request from {Ip}", ctx.HttpContext.Connection.RemoteIpAddress);
            return Results.Unauthorized();
        }
        return await next(ctx);
    }
}

public static class ClientIp
{
    /// <summary>
    /// Trusts X-Forwarded-For only when the request carries a valid client API key
    /// (i.e. it came from our own Next.js server). Otherwise uses the socket address.
    /// </summary>
    public static string Get(HttpContext http, IConfiguration config)
    {
        var expected = config["Security:ClientApiKey"];
        if (!string.IsNullOrEmpty(expected) && KeyCompare.Matches(http.Request.Headers["X-Api-Key"], expected))
        {
            var fwd = http.Request.Headers["X-Forwarded-For"].ToString().Split(',')[0].Trim();
            if (!string.IsNullOrEmpty(fwd)) return fwd;
        }
        return http.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }
}
