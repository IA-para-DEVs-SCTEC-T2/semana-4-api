# Requirements — Items API

## Objetivo

Desenvolver uma API REST para gerenciamento de itens numéricos inteiros, com operações de listagem, criação e remoção, armazenamento em memória e validação de entrada.

---

## User Stories

### US-01 — Listar itens
**Como** consumidor da API,
**Quero** consultar todos os itens cadastrados,
**Para que** eu possa visualizar o estado atual da coleção.

**Critérios de aceite:**
- `GET /items` retorna lista de objetos `{ "value": number }`
- Retorna array vazio `[]` quando não há itens
- Status `200 OK`

---

### US-02 — Criar item
**Como** consumidor da API,
**Quero** adicionar um novo número inteiro à coleção,
**Para que** ele passe a fazer parte do conjunto gerenciado.

**Critérios de aceite:**
- `POST /items` com body `{ "value": number }`
- Aceita apenas números inteiros válidos
- Não permite duplicatas — retorna `409 Conflict` se o valor já existir
- Retorna `{ "message": "Item criado com sucesso" }` com status `201 Created`
- Retorna `400 Bad Request` para entrada inválida (ex: string, float, campo ausente)

---

### US-03 — Remover item
**Como** consumidor da API,
**Quero** remover um item específico pelo seu valor,
**Para que** ele deixe de fazer parte da coleção.

**Critérios de aceite:**
- `DELETE /items/{value}` onde `value` é um inteiro
- Retorna `{ "message": "Item removido com sucesso" }` com status `200 OK`
- Retorna `404 Not Found` se o item não existir

---

## Escopo

| # | O que será feito |
|---|-----------------|
| 1 | Endpoint `GET /items` — listar todos os itens |
| 2 | Endpoint `POST /items` — criar item com validação e controle de duplicatas |
| 3 | Endpoint `DELETE /items/{value}` — remover item por valor |
| 4 | Armazenamento em memória (singleton em runtime) |
| 5 | Validação de entrada (tipo inteiro obrigatório) |
| 6 | Tratamento de erros com respostas padronizadas |
| 7 | Documentação via Swagger/OpenAPI |
| 8 | Logging básico por requisição |
| 9 | Separação em camadas: Controller → Service → Model |

---

## Fora de Escopo

| # | O que NÃO será feito |
|---|----------------------|
| 1 | Persistência em banco de dados |
| 2 | Autenticação e autorização |
| 3 | Paginação ou filtros na listagem |
| 4 | Atualização (PUT/PATCH) de itens |
| 5 | Suporte a tipos não inteiros (float, string, etc.) |
| 6 | Deploy ou containerização (Docker) |
| 7 | Testes automatizados (unitários/integração) |

---

## Regras de Negócio

| ID | Regra |
|----|-------|
| RN-01 | O campo `value` é obrigatório no body do `POST /items` |
| RN-02 | O campo `value` deve ser um número inteiro (não aceita float nem string) |
| RN-03 | Não são permitidos valores duplicados na coleção |
| RN-04 | A tentativa de inserir um duplicado retorna `409 Conflict` |
| RN-05 | A tentativa de remover um item inexistente retorna `404 Not Found` |
| RN-06 | O parâmetro `{value}` no DELETE deve ser um inteiro válido na rota |
| RN-07 | O armazenamento é volátil — os dados são perdidos ao reiniciar a aplicação |
