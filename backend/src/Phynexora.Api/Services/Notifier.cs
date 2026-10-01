using System.Net;
using System.Net.Mail;

namespace Phynexora.Api.Services;

public interface INotifier
{
    Task NotifyAsync(string subject, string body, CancellationToken ct);
}

/// <summary>Sends team notifications by SMTP when configured, otherwise logs them.</summary>
public sealed class Notifier(IConfiguration config, ILogger<Notifier> log) : INotifier
{
    public async Task NotifyAsync(string subject, string body, CancellationToken ct)
    {
        var host = config["Smtp:Host"];
        var to = config["Notifications:To"];
        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(to))
        {
            log.LogInformation("Notification (SMTP not configured): {Subject}", subject);
            return;
        }
        try
        {
            using var client = new SmtpClient(host, int.TryParse(config["Smtp:Port"], out var p) ? p : 587)
            {
                EnableSsl = !string.Equals(config["Smtp:EnableSsl"], "false", StringComparison.OrdinalIgnoreCase),
                Credentials = new NetworkCredential(config["Smtp:Username"], config["Smtp:Password"]),
            };
            using var msg = new MailMessage(config["Smtp:From"] ?? config["Smtp:Username"]!, to, subject, body);
            await client.SendMailAsync(msg, ct);
        }
        catch (Exception ex)
        {
            // Notifications must never fail the user's submission.
            log.LogError(ex, "Failed to send notification email");
        }
    }
}
