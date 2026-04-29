# Design e Arquitetura — Items API

## Visão Geral

API REST stateless construída com ASP.NET Core (.NET 9), organizada em camadas e com armazenamento volátil em memória.

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | ASP.NET Core 9 |
| Linguagem | C# 13 |
| Documentação | Swagger / Swashbuckle 6.5.0 |
| Armazenamento | Lista em memória (`List<int>`) |
| Logging | `ILogger` nativo do ASP.NET Core |

---

## Arquitetura em Camadas

```
┌─────────────────────────────┐
│         HTTP Client         │
└────────────┬────────────────┘
             │ HTTP Request
┌────────────▼────────────────┐
│       Controller Layer      │  ← Recebe requisições, valida entrada, retorna respostas HTTP
│     ItemsController.cs      │
└────────────┬────────────────┘
             │ Chamada de método
┌────────────▼────────────────┐
│        Service Layer        │  ← Contém a lógica de negócio e regras (duplicatas, etc.)
│       ItemService.cs        │
└────────────┬────────────────┘
             │ Leitura/Escrita
┌────────────▼────────────────┐
│       In-Memory Store       │  ← List<int> gerenciada como Singleton
└─────────────────────────────┘
```

---

## Estrutura de Arquivos

```
ItemsApi/
├── ItemsApi.csproj
├── Program.cs                    # Bootstrap, DI, Swagger
├── Controllers/
│   └── ItemsController.cs        # Endpoints REST
├── Services/
│   └── ItemService.cs            # Lógica de negócio
└── Models/
    └── Item.cs                   # Modelo de entrada
```

---

## Endpoints

### GET /items
- **Descrição:** Retorna todos os itens cadastrados
- **Response:** `200 OK` → `[{ "value": 1 }, { "value": 2 }]`
- **Response vazio:** `200 OK` → `[]`

### POST /items
- **Descrição:** Adiciona um novo item inteiro
- **Request Body:** `{ "value": 10 }`
- **Responses:**
  - `201 Created` → `{ "message": "Item criado com sucesso" }`
  - `400 Bad Request` → entrada inválida (model binding)
  - `409 Conflict` → `{ "message": "Item já existe." }`

### DELETE /items/{value}
- **Descrição:** Remove um item pelo valor
- **Parâmetro de rota:** `value` (int, constraint `:int`)
- **Responses:**
  - `200 OK` → `{ "message": "Item removido com sucesso" }`
  - `404 Not Found` → `{ "message": "Item não encontrado." }`

---

## Modelo de Dados

```csharp
// Entrada (request body)
public class Item
{
    public int Value { get; set; }
}

// Armazenamento interno
private readonly List<int> _items = new();
```

---

## Injeção de Dependência

| Serviço | Lifetime | Justificativa |
|---------|----------|---------------|
| `ItemService` | `Singleton` | Mantém o estado da lista em memória durante toda a vida da aplicação |

---

## Tratamento de Erros

| Situação | Status Code | Mensagem |
|----------|-------------|----------|
| Entrada inválida (tipo errado) | `400 Bad Request` | Erro de model binding do ASP.NET |
| Item duplicado | `409 Conflict` | `"Item já existe."` |
| Item não encontrado | `404 Not Found` | `"Item não encontrado."` |

---

## Decisões de Design

| Decisão | Justificativa |
|---------|---------------|
| Armazenamento em memória | Simplicidade — sem dependência de banco de dados |
| `Singleton` para o serviço | Garante que a lista persista entre requisições |
| Retorno de `object` anônimo | Evita criar DTOs desnecessários para respostas simples |
| Rota com constraint `:int` | Garante que o parâmetro `{value}` seja inteiro na própria rota |
| Tuple de retorno no Service | Permite comunicar sucesso/falha sem lançar exceções |
