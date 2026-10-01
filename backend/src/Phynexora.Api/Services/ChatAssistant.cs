using System.Text.Json;
using System.Text.Json.Serialization;
using Phynexora.Api.Contracts;

namespace Phynexora.Api.Services;

/// <summary>
/// Provider-independent chat abstraction. The website never talks to an AI provider directly;
/// keys live only in server configuration (environment variables / secret store).
/// </summary>
public interface IChatAssistant
{
    bool Enabled { get; }
    Task<string?> ReplyAsync(IReadOnlyList<ChatTurn> messages, CancellationToken ct);
}

public sealed class DisabledChatAssistant : IChatAssistant
{
    public bool Enabled => false;
    public Task<string?> ReplyAsync(IReadOnlyList<ChatTurn> messages, CancellationToken ct) => Task.FromResult<string?>(null);
}

/// <summary>Anthropic Messages API implementation. Configure Ai:Provider=Anthropic, Ai:ApiKey, Ai:Model.</summary>
public sealed class AnthropicChatAssistant(HttpClient http, IConfiguration config, ILogger<AnthropicChatAssistant> log) : IChatAssistant
{
    public const string SystemPrompt = """
        You are the website assistant for Phynexora, a software development and digital solutions company.
        Phynexora builds custom ERP systems, POS systems, business management systems, websites, web applications,
        e-commerce platforms, mobile apps, custom software, APIs and system integrations, business automation,
        AI-powered solutions, database and cloud solutions, and provides maintenance and support.
        Tagline: "Technology That Makes Business Easier."

        Rules:
        - Be concise (2–4 short sentences), professional, warm and plain-spoken.
        - Never quote prices, fixed timelines or guarantees. Explain that estimates follow a requirements conversation.
        - Never invent clients, projects, statistics or contact details.
        - If asked something unrelated to Phynexora's services, politely steer back.
        - Encourage the visitor to share their project details or continue on WhatsApp when appropriate.
        """;

    public bool Enabled => !string.IsNullOrWhiteSpace(config["Ai:ApiKey"]);

    public async Task<string?> ReplyAsync(IReadOnlyList<ChatTurn> messages, CancellationToken ct)
    {
        if (!Enabled) return null;
        var payload = new
        {
            model = config["Ai:Model"] ?? "claude-sonnet-4-5",
            max_tokens = 400,
            system = SystemPrompt,
            messages = messages.Select(m => new { role = m.Role, content = m.Content }),
        };
        using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages")
        {
            Content = JsonContent.Create(payload),
        };
        req.Headers.Add("x-api-key", config["Ai:ApiKey"]);
        req.Headers.Add("anthropic-version", "2023-06-01");
        try
        {
            using var res = await http.SendAsync(req, ct);
            if (!res.IsSuccessStatusCode)
            {
                log.LogWarning("AI provider returned {Status}", (int)res.StatusCode);
                return null;
            }
            var body = await res.Content.ReadFromJsonAsync<AnthropicResponse>(cancellationToken: ct);
            return body?.Content?.FirstOrDefault(c => c.Type == "text")?.Text?.Trim();
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
        {
            log.LogWarning(ex, "AI provider call failed");
            return null;
        }
    }

    private sealed record AnthropicResponse([property: JsonPropertyName("content")] List<Block>? Content);
    private sealed record Block([property: JsonPropertyName("type")] string Type, [property: JsonPropertyName("text")] string? Text);
}
