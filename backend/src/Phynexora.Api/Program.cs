using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.RateLimiting;
using Phynexora.Api.Data;
using Phynexora.Api.Endpoints;
using Phynexora.Api.Security;
using Phynexora.Api.Services;
#if SQLSERVER
using Microsoft.EntityFrameworkCore;
using Phynexora.Api.Data.Ef;
#endif
using Phynexora.Api.Data.FileStore;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// ---------- Persistence ----------
var provider = config["Database:Provider"] ?? "SqlServer";
#if SQLSERVER
if (provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
{
    builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlServer(
        config.GetConnectionString("Default") ?? throw new InvalidOperationException("ConnectionStrings:Default is required for SQL Server."),
        sql => sql.EnableRetryOnFailure(5)));
    builder.Services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
}
else
#endif
{
    if (!provider.Equals("File", StringComparison.OrdinalIgnoreCase))
        Console.WriteLine($"[warn] Database provider '{provider}' unavailable in this build – using JSON file store.");
    builder.Services.AddSingleton(typeof(IRepository<>), typeof(JsonFileRepository<>));
}

// ---------- Services ----------
builder.Services.AddSingleton<IFileStorage, LocalFileStorage>();
builder.Services.AddSingleton<INotifier, Notifier>();
builder.Services.AddHttpClient<IHumanVerifier, TurnstileVerifier>(c => c.Timeout = TimeSpan.FromSeconds(10));
if (string.Equals(config["Ai:Provider"], "Anthropic", StringComparison.OrdinalIgnoreCase))
    builder.Services.AddHttpClient<IChatAssistant, AnthropicChatAssistant>(c => c.Timeout = TimeSpan.FromSeconds(30));
else
    builder.Services.AddSingleton<IChatAssistant, DisabledChatAssistant>();

builder.Services.AddProblemDetails();
builder.Services.AddHealthChecks();
builder.Services.ConfigureHttpJsonOptions(o =>
{
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
    o.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
builder.Services.Configure<FormOptions>(o => o.MultipartBodyLengthLimit = UploadRules.MaxBytes + 512 * 1024);
builder.WebHost.ConfigureKestrel(k => k.Limits.MaxRequestBodySize = UploadRules.MaxBytes + 1024 * 1024);

// ---------- CORS (only needed if a browser-based admin panel calls the API directly) ----------
var origins = config.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
{
    if (origins.Length > 0) p.WithOrigins(origins).AllowAnyHeader().WithMethods("GET", "POST", "PATCH", "DELETE");
}));

// ---------- Rate limiting ----------
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    RateLimitPartition<string> Window(HttpContext http, int limit, TimeSpan window) =>
        RateLimitPartition.GetFixedWindowLimiter(ClientIp.Get(http, config),
            _ => new FixedWindowRateLimiterOptions { PermitLimit = limit, Window = window, QueueLimit = 0 });

    o.AddPolicy("forms", http => Window(http, 10, TimeSpan.FromMinutes(10)));
    o.AddPolicy("chat", http => Window(http, 20, TimeSpan.FromMinutes(5)));
    o.AddPolicy("read", http => Window(http, 120, TimeSpan.FromMinutes(1)));
    o.AddPolicy("admin", http => Window(http, 120, TimeSpan.FromMinutes(1)));
});

var app = builder.Build();

#if SQLSERVER
if (provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase) && config.GetValue("Database:AutoMigrate", false))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (db.Database.GetMigrations().Any()) await db.Database.MigrateAsync();
    else await db.Database.EnsureCreatedAsync();
}
#endif

app.UseExceptionHandler();
app.UseStatusCodePages();
if (!app.Environment.IsDevelopment()) app.UseHsts();

app.Use(async (ctx, next) =>
{
    var h = ctx.Response.Headers;
    h["X-Content-Type-Options"] = "nosniff";
    h["X-Frame-Options"] = "DENY";
    h["Referrer-Policy"] = "no-referrer";
    h["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'";
    await next();
});

app.UseCors();
app.UseRateLimiter();

app.MapHealthChecks("/health");
app.MapGet("/", () => Results.Ok(new { name = "Phynexora API", status = "ok" }));
app.MapPublicEndpoints();
app.MapAdminEndpoints();

app.Run();

public partial class Program;
