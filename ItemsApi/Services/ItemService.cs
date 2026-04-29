namespace ItemsApi.Services;

public class ItemService
{
    private readonly List<int> _items = new();

    public IEnumerable<object> GetAll() =>
        _items.Select(v => new { value = v });

    public (bool success, string message) Add(int value)
    {
        if (_items.Contains(value))
            return (false, "Item já existe.");

        _items.Add(value);
        return (true, "Item criado com sucesso");
    }

    public (bool success, string message) Remove(int value)
    {
        if (!_items.Contains(value))
            return (false, "Item não encontrado.");

        _items.Remove(value);
        return (true, "Item removido com sucesso");
    }
}
