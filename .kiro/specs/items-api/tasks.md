# Tasks — Items API

## Status

| Símbolo | Significado |
|---------|-------------|
| ✅ | Concluído |
| 🔄 | Em andamento |
| ⬜ | Pendente |

---

## FASE 1 — Setup do Projeto

| # | Tarefa | Status |
|---|--------|--------|
| 1.1 | Criar projeto ASP.NET Core Web API (.NET 9) | ✅ |
| 1.2 | Configurar `Program.cs` com DI, Swagger e roteamento | ✅ |
| 1.3 | Adicionar pacote `Swashbuckle.AspNetCore` 6.5.0 | ✅ |

---

## FASE 2 — Modelagem

| # | Tarefa | Status |
|---|--------|--------|
| 2.1 | Criar model `Item` com propriedade `Value` (int) | ✅ |

---

## FASE 3 — Camada de Serviço

| # | Tarefa | Status |
|---|--------|--------|
| 3.1 | Criar `ItemService` com lista em memória | ✅ |
| 3.2 | Implementar método `GetAll()` | ✅ |
| 3.3 | Implementar método `Add(int value)` com validação de duplicata | ✅ |
| 3.4 | Implementar método `Remove(int value)` com verificação de existência | ✅ |

---

## FASE 4 — Controller

| # | Tarefa | Status |
|---|--------|--------|
| 4.1 | Criar `ItemsController` com rota base `/items` | ✅ |
| 4.2 | Implementar `GET /items` | ✅ |
| 4.3 | Implementar `POST /items` com retorno 201/400/409 | ✅ |
| 4.4 | Implementar `DELETE /items/{value}` com retorno 200/404 | ✅ |
| 4.5 | Adicionar logging por endpoint via `ILogger` | ✅ |

---

## FASE 5 — Documentação e Spec

| # | Tarefa | Status |
|---|--------|--------|
| 5.1 | Configurar Swagger/OpenAPI | ✅ |
| 5.2 | Criar `requirements.md` com user stories e regras de negócio | ✅ |
| 5.3 | Criar `design.md` com arquitetura e decisões técnicas | ✅ |
| 5.4 | Criar `tasks.md` com rastreamento de tarefas | ✅ |
| 5.5 | Criar `coding-standards.md` com padrões do projeto | ✅ |

---

## Backlog (Fora do Escopo Atual)

| # | Tarefa |
|---|--------|
| B.1 | Adicionar testes unitários para `ItemService` |
| B.2 | Adicionar testes de integração para os endpoints |
| B.3 | Persistência em banco de dados (ex: SQLite, PostgreSQL) |
| B.4 | Autenticação via JWT |
| B.5 | Containerização com Docker |
| B.6 | Pipeline CI/CD |
