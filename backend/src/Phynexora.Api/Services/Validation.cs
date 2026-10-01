using System.ComponentModel.DataAnnotations;
using System.Collections;

namespace Phynexora.Api.Services;

public static class Validation
{
    /// <summary>Validates DataAnnotations recursively (including list items). Returns null when valid.</summary>
    public static Dictionary<string, string[]>? Validate(object model)
    {
        var errors = new Dictionary<string, string[]>();
        Walk(model, "", errors, depth: 0);
        return errors.Count == 0 ? null : errors;
    }

    private static void Walk(object model, string prefix, Dictionary<string, string[]> errors, int depth)
    {
        if (depth > 3) return;
        var results = new List<ValidationResult>();
        Validator.TryValidateObject(model, new ValidationContext(model), results, validateAllProperties: true);
        foreach (var r in results)
        {
            var key = prefix + (r.MemberNames.FirstOrDefault() ?? "form");
            errors[key] = errors.TryGetValue(key, out var existing) ? existing.Append(r.ErrorMessage ?? "Invalid").ToArray() : new[] { r.ErrorMessage ?? "Invalid" };
        }
        foreach (var prop in model.GetType().GetProperties())
        {
            if (prop.PropertyType == typeof(string) || !typeof(IEnumerable).IsAssignableFrom(prop.PropertyType)) continue;
            if (prop.GetValue(model) is not IEnumerable list) continue;
            var i = 0;
            foreach (var item in list)
            {
                if (item is not null && item.GetType().IsClass) Walk(item, $"{prefix}{prop.Name}[{i}].", errors, depth + 1);
                i++;
            }
        }
    }
}
