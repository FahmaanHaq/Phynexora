using System.Text.Json;
using Phynexora.Api.Domain;

namespace Phynexora.Api.Data.FileStore;

/// <summary>
/// Thread-safe JSON file repository for development and demos (single instance only).
/// Use SQL Server in production.
/// </summary>
public sealed class JsonFileRepository<T> : IRepository<T> where T : class, IEntity
{
    private static readonly SemaphoreSlim Lock = new(1, 1);
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { WriteIndented = true };
    private readonly string _path;

    public JsonFileRepository(IConfiguration config, IHostEnvironment env)
    {
        var dir = config["Storage:DataPath"] is { Length: > 0 } p ? p : Path.Combine(env.ContentRootPath, "App_Data");
        Directory.CreateDirectory(dir);
        _path = Path.Combine(dir, $"{typeof(T).Name.ToLowerInvariant()}s.json");
    }

    private async Task<List<T>> ReadAsync(CancellationToken ct)
    {
        if (!File.Exists(_path)) return new List<T>();
        await using var fs = File.OpenRead(_path);
        return await JsonSerializer.DeserializeAsync<List<T>>(fs, Json, ct) ?? new List<T>();
    }

    private async Task WriteAsync(List<T> items, CancellationToken ct)
    {
        var tmp = _path + ".tmp";
        await using (var fs = File.Create(tmp))
            await JsonSerializer.SerializeAsync(fs, items, Json, ct);
        File.Move(tmp, _path, overwrite: true);
    }

    private async Task<TResult> WithLock<TResult>(Func<Task<TResult>> action, CancellationToken ct)
    {
        await Lock.WaitAsync(ct);
        try { return await action(); }
        finally { Lock.Release(); }
    }

    public Task AddAsync(T entity, CancellationToken ct = default) => WithLock(async () =>
    {
        var items = await ReadAsync(ct);
        items.Add(entity);
        await WriteAsync(items, ct);
        return true;
    }, ct);

    public Task<T?> GetAsync(Guid id, CancellationToken ct = default) => WithLock(async () =>
        (await ReadAsync(ct)).FirstOrDefault(x => x.Id == id), ct);

    public Task UpdateAsync(T entity, CancellationToken ct = default) => WithLock(async () =>
    {
        var items = await ReadAsync(ct);
        var i = items.FindIndex(x => x.Id == entity.Id);
        if (i >= 0) { items[i] = entity; await WriteAsync(items, ct); }
        return true;
    }, ct);

    public Task<bool> DeleteAsync(Guid id, CancellationToken ct = default) => WithLock(async () =>
    {
        var items = await ReadAsync(ct);
        var removed = items.RemoveAll(x => x.Id == id) > 0;
        if (removed) await WriteAsync(items, ct);
        return removed;
    }, ct);

    public Task<PagedResult<T>> ListAsync(Func<IQueryable<T>, IQueryable<T>>? query, int page, int pageSize, CancellationToken ct = default) => WithLock(async () =>
    {
        IQueryable<T> q = (await ReadAsync(ct)).AsQueryable();
        if (query is not null) q = query(q);
        var total = q.Count();
        var items = q.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        return new PagedResult<T>(items, total, page, pageSize);
    }, ct);
}
