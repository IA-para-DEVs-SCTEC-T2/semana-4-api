# Coding Standards — Items API

Padrões e convenções adotados neste projeto. Todos os contribuidores devem seguir estas diretrizes.

---

## Linguagem e Framework

- **C# 13** com **ASP.NET Core 9**
- Usar `Nullable enable` e `ImplicitUsings enable`
- Preferir `record` para DTOs imutáveis quando aplicável
- Usar `file-scoped namespaces` (ex: `namespace ItemsApi.Controllers;`)

---

## Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Classes | PascalCase | `ItemService` |
| Métodos | PascalCase | `GetAll()` |
| Propriedades | PascalCase | `Value` |
| Variáveis locais | camelCase | `itemValue` |
| Campos privados | _camelCase | `_items` |
| Interfaces | IPascalCase | `IItemService` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITEMS` |

---

## Estrutura de Camadas

```
Controllers/   → Apenas recebe requisição, delega ao Service, retorna resposta HTTP
Services/      → Toda a lógica de negócio fica aqui
Models/        → Modelos de entrada/saída (sem lógica)
```

- Controllers **não** devem conter lógica de negócio
- Services **não** devem conhecer `HttpContext` ou tipos HTTP
- Models devem ser simples (sem métodos de negócio)

---

## Padrões REST

- Usar substantivos no plural para rotas: `/items`, não `/item`
- Usar os status HTTP corretos:
  - `200 OK` — sucesso em GET e DELETE
  - `201 Created` — sucesso em POST
  - `400 Bad Request` — entrada inválida
  - `404 Not Found` — recurso não encontrado
  - `409 Conflict` — conflito de estado (ex: duplicata)
- Respostas de erro devem seguir o padrão: `{ "message": "..." }`

---

## Validação

- Usar Data Annotations ou model binding nativo do ASP.NET para validação básica
- Validações de negócio (ex: duplicatas) ficam no `Service`
- Nunca confiar em dados do cliente sem validar

---

## Logging

- Usar `ILogger<T>` injetado via construtor
- Logar entrada de cada endpoint com nível `Information`
- Logar erros com nível `Warning` ou `Error`
- Não logar dados sensíveis

```csharp
// Correto
_logger.LogInformation("POST /items value={Value}", item.Value);

// Errado
Console.WriteLine("item: " + item.Value);
```

---

## Injeção de Dependência

- Registrar serviços em `Program.cs`
- Preferir injeção via construtor
- Usar o lifetime adequado:
  - `Singleton` → estado compartilhado (ex: lista em memória)
  - `Scoped` → por requisição (ex: contexto de banco)
  - `Transient` → sem estado

---

## Commits

Seguir o padrão **Conventional Commits**:

```
feat: adiciona endpoint DELETE /items/{value}
fix: corrige validação de inteiro no POST
docs: atualiza requirements.md com nova regra de negócio
refactor: extrai lógica de validação para método privado
```

---

## O que evitar

- ❌ Lógica de negócio no Controller
- ❌ `Console.WriteLine` em produção (usar `ILogger`)
- ❌ Retornar exceções não tratadas ao cliente
- ❌ Campos públicos em Models (usar propriedades)
- ❌ Commits diretos na branch `main`
