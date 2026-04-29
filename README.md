# API Vibe Code 🚀

> Exercício da aula de hoje — comparação entre geração de API com **Vibe Code** x **Spec**

---

## 📚 Sobre o exercício

Este projeto foi desenvolvido como exercício prático para comparar duas abordagens de geração de código com IA:

| Abordagem | Descrição |
|-----------|-----------|
| **Vibe Code** | Geração livre via prompt direto no chat, descrevendo o que se quer de forma conversacional |
| **Spec** | Geração estruturada com requisitos formalizados em documento de especificação antes da implementação |

A proposta foi construir a mesma API REST usando as duas abordagens e observar as diferenças em qualidade, estrutura, cobertura de casos de erro e velocidade de desenvolvimento.

---

## 📦 Sobre a API

API REST para gerenciamento de itens, construída com **Node.js** e **Express**.

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/items` | Retorna a lista completa de itens |
| `POST` | `/items` | Cria um novo item |
| `DELETE` | `/items/:id` | Remove um item pelo id |

---

## 🗂️ Estrutura do projeto

```
semana-4-api/
├── src/
│   ├── server.js                  # Entry point
│   ├── app.js                     # Express app e middlewares
│   ├── data/
│   │   └── items.js               # Dados mockados
│   ├── routes/
│   │   └── items.js               # Definição das rotas
│   ├── controllers/
│   │   └── itemsController.js     # Lógica dos endpoints
│   ├── validators/
│   │   └── itemValidator.js       # Validação dos campos
│   └── middlewares/
│       └── errorHandler.js        # Tratamento de erros global
├── .gitignore
├── package.json
└── README.md
```

---

## ▶️ Como rodar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Iniciar o servidor

```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

O servidor sobe em `http://localhost:3000`.

---

## 🔌 Exemplos de uso

### GET /items

```bash
curl http://localhost:3000/items
```

**Resposta:**
```json
{
  "success": true,
  "count": 4,
  "data": [...]
}
```

---

### POST /items

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Headset Sony WH-1000XM5",
    "description": "Fone com cancelamento de ruído ativo",
    "price": 1899.90,
    "category": "electronics",
    "inStock": true
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Item created successfully.",
  "data": {
    "id": "uuid-gerado",
    "name": "Headset Sony WH-1000XM5",
    ...
  }
}
```

---

### DELETE /items/:id

```bash
curl -X DELETE http://localhost:3000/items/uuid-do-item
```

**Resposta:**
```json
{
  "success": true,
  "message": "Item deleted successfully.",
  "data": { ... }
}
```

---

## ✅ Validações (POST)

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| `name` | ✅ | String, 2–100 caracteres |
| `description` | ✅ | String, 5–500 caracteres |
| `price` | ✅ | Número positivo |
| `category` | ✅ | Um de: `electronics`, `peripherals`, `accessories`, `software`, `other` |
| `inStock` | ❌ | Boolean (default: `true`) |

Erros de validação retornam `422 Unprocessable Entity` com a lista de problemas:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Field \"name\" must be a string with at least 2 characters.",
    "Field \"description\" is required."
  ]
}
```

---

## ⚠️ Tratamento de erros

| Situação | Status |
|----------|--------|
| Item não encontrado | `404` |
| Rota inexistente | `404` |
| JSON inválido no body | `400` |
| Campos inválidos | `422` |
| Erro interno | `500` |

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [UUID](https://github.com/uuidjs/uuid)
