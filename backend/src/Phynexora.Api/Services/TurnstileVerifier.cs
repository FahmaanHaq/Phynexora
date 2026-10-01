using System.Text.Json.Serialization;

namespace Phynexora.Api.Services;

public interface IHumanVerifier
{
    bool Enabled { get; }
    Task<bool> VerifyAsync(string? token, string? ip, CancellationToken ct);
}

/// <summary>Cloudflare Turnstile verification. Disabled (always passes) when no secret is configured.</summary>
public sealed class TurnstileVerifier(HttpClient http, IConfiguration config, ILogger<TurnstileVerifier> log) : IHumanVerifier
{
    private readonly string? _secret = config["Turnstile:SecretKey"];
    public bool Enabled => !string.IsNullOrWhiteSpace(_secret);

    private sealed record Result([property: JsonPropertyName("success")] bool Success);

    public async Task<bool> VerifyAsync(string? token, string? ip, CancellationToken ct)
    {
        if (!Enabled) return true;
        if (string.IsNullOrWhiteSpace(token)) return false;
        try
        {
            var form = new Dictionary<string, string> { ["secret"] = _secret!, ["response"] = token };
            if (!string.IsNullOrEmpty(ip)) form["remoteip"] = ip;
            using var res = await http.PostAsync("https://challenges.cloudflare.com/turnstile/v0/siteverify", new FormUrlEncodedContent(form), ct);
            var body = await res.Content.ReadFromJsonAsync<Result>(cancellationToken: ct);
            return body?.Success == true;
        }
        catch (Exception ex)
        {
            log.LogWarning(ex, "Turnstile verification failed");
            return false;
        }
    }
}
