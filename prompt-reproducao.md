## PROMPT

Você é um engenheiro de software experiente especializado em APIs RESTful com ASP.NET Core.

Crie um projeto completo chamado **ItemsApi** seguindo rigorosamente todas as especificações abaixo. Ao final, o workspace deve conter tanto o código da API quanto a estrutura de documentação Spec-Driven do Kiro.

---

### 1. STACK E CONFIGURAÇÃO

- Linguagem: **C# 13**
- Framework: **ASP.NET Core 9** (`net9.0`)
- Pacote adicional: `Swashbuckle.AspNetCore` versão `6.5.0`
- Habilitar: `<Nullable>enable</Nullable>` e `<ImplicitUsings>enable</ImplicitUsings>`

---

### 2. ESTRUTURA DE ARQUIVOS

Gere exatamente esta estrutura:

```
ItemsApi/
Código-fonte do projeto relacionado a api.

.kiro/
├── specs/
│   └── items-api/
│       ├── requirements.md
│       ├── design.md
│       └── tasks.md
└── steering/
    └── coding-standards.md
```

---

### 3. ENTIDADE

```json
{ "value": number }
```

O campo `value` é sempre um número inteiro (`int`). Não aceitar float, string ou campo ausente.

---

### 4. ENDPOINTS

#### GET /items
- Retorna todos os itens cadastrados
- Response `200 OK`: `[{ "value": 1 }, { "value": 2 }]`
- Retorna `[]` quando vazio

#### POST /items
- Body: `{ "value": 10 }`
- Aceita apenas inteiros válidos
- Não permite duplicatas
- Response `201 Created`: `{ "message": "Item criado com sucesso" }`
- Response `400 Bad Request`: entrada inválida
- Response `409 Conflict`: valor duplicado com `{ "message": "Item já existe." }`

#### DELETE /items/{value}
- Parâmetro de rota `value` com constraint `:int`
- Response `200 OK`: `{ "message": "Item removido com sucesso" }`
- Response `404 Not Found`: `{ "message": "Item não encontrado." }`

---

### 5. REGRAS DE NEGÓCIO

- RN-01: `value` é obrigatório no body do POST
- RN-02: `value` deve ser inteiro (não aceita float nem string)
- RN-03: Não são permitidos valores duplicados
- RN-04: Duplicata retorna `409 Conflict`
- RN-05: Remover item inexistente retorna `404 Not Found`
- RN-06: Parâmetro `{value}` no DELETE deve ser inteiro válido na rota
- RN-07: Armazenamento é volátil — dados perdidos ao reiniciar

---

### 5. ARQUITETURA E PADRÕES

**Separação em camadas obrigatória:**
- `Controllers/` → recebe requisição, delega ao Service, retorna resposta HTTP. Sem lógica de negócio.
- `Services/` → toda a lógica de negócio. Sem conhecimento de `HttpContext`.
- `Models/` → modelos simples de entrada/saída. Sem métodos de negócio.

**Armazenamento:** `List<int>` privada dentro do `ItemService`, registrado como `Singleton` no DI.

**Logging:** usar `ILogger<T>` injetado via construtor. Logar entrada de cada endpoint com `LogInformation`. Nunca usar `Console.WriteLine`.

**Nomenclatura:**
- Classes/Métodos/Propriedades: PascalCase
- Campos privados: `_camelCase`
- Namespaces: file-scoped (ex: `namespace ItemsApi.Controllers;`)

---

### 6. DOCUMENTAÇÃO KIRO (SPEC-DRIVEN)

Crie os seguintes arquivos de documentação:

#### .kiro/specs/items-api/requirements.md
Deve conter:
- Objetivo do projeto
- 3 user stories (US-01 Listar, US-02 Criar, US-03 Remover) no formato: Como / Quero / Para que + Critérios de aceite
- Tabela de Escopo (o que será feito)
- Tabela de Fora de Escopo (o que não será feito)
- Tabela de Regras de Negócio (RN-01 a RN-07)

#### .kiro/specs/items-api/design.md
Deve conter:
- Visão geral da arquitetura
- Tabela de stack tecnológica
- Diagrama ASCII da arquitetura em camadas (HTTP Client → Controller → Service → In-Memory Store)
- Estrutura de arquivos do projeto
- Descrição de cada endpoint com request/response
- Modelo de dados em C#
- Tabela de injeção de dependência com lifetime e justificativa
- Tabela de tratamento de erros
- Tabela de decisões de design com justificativas

#### .kiro/specs/items-api/tasks.md
Deve conter rastreamento de tarefas organizado em fases com status (✅ Concluído / 🔄 Em andamento / ⬜ Pendente):
- FASE 1: Setup do Projeto (3 tarefas)
- FASE 2: Modelagem (1 tarefa)
- FASE 3: Camada de Serviço (4 tarefas)
- FASE 4: Controller (5 tarefas)
- FASE 5: Documentação e Spec (5 tarefas)
- Backlog com itens fora do escopo atual (testes, banco, auth, Docker, CI/CD)

#### .kiro/steering/coding-standards.md
Deve conter os padrões do projeto:
- Linguagem e framework
- Tabela de nomenclatura (PascalCase, camelCase, _camelCase, etc.)
- Regras de separação em camadas
- Padrões REST (rotas, status codes, formato de erro)
- Regras de validação
- Regras de logging com exemplo correto e incorreto
- Regras de injeção de dependência com lifetimes
- Lista do que evitar (❌)

---

### 7. VERIFICAÇÃO FINAL

Após gerar todos os arquivos, confirme que:
- [ ] `dotnet run` executa sem erros
- [ ] Swagger acessível em `/swagger`
- [ ] Todos os 9 arquivos foram criados na estrutura correta
- [ ] Nenhuma lógica de negócio está no Controller
- [ ] `ItemService` está registrado como `Singleton`
- [ ] Logging usa `ILogger`, não `Console.WriteLine`
