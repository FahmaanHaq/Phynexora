using Phynexora.Api.Domain;

namespace Phynexora.Api.Data;

public sealed record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);

/// <summary>
/// Persistence abstraction. Implemented by EF Core (SQL Server) and by a JSON file
/// store for local development. Endpoints never depend on a specific database.
/// </summary>
public interface IRepository<T> where T : class, IEntity
{
    Task AddAsync(T entity, CancellationToken ct = default);
    Task<T?> GetAsync(Guid id, CancellationToken ct = default);
    Task UpdateAsync(T entity, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
    Task<PagedResult<T>> ListAsync(Func<IQueryable<T>, IQueryable<T>>? query, int page, int pageSize, CancellationToken ct = default);
}
