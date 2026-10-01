using Microsoft.EntityFrameworkCore;
using Phynexora.Api.Domain;

namespace Phynexora.Api.Data.Ef;

public sealed class EfRepository<T>(AppDbContext db) : IRepository<T> where T : class, IEntity
{
    private DbSet<T> Set => db.Set<T>();

    public async Task AddAsync(T entity, CancellationToken ct = default)
    {
        Set.Add(entity);
        await db.SaveChangesAsync(ct);
    }

    public Task<T?> GetAsync(Guid id, CancellationToken ct = default) => Set.FirstOrDefaultAsync(x => x.Id == id, ct);

    public async Task UpdateAsync(T entity, CancellationToken ct = default)
    {
        Set.Update(entity);
        await db.SaveChangesAsync(ct);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await GetAsync(id, ct);
        if (entity is null) return false;
        Set.Remove(entity);
        await db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<PagedResult<T>> ListAsync(Func<IQueryable<T>, IQueryable<T>>? query, int page, int pageSize, CancellationToken ct = default)
    {
        IQueryable<T> q = Set.AsNoTracking();
        if (query is not null) q = query(q);
        var total = await q.CountAsync(ct);
        var items = await q.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(ct);
        return new PagedResult<T>(items, total, page, pageSize);
    }
}
