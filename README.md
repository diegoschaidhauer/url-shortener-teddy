
# URL Shortener API - Desafio Teddy

Esta aplicação é uma API de encurtamento de URLs construída com **NestJS**, **TypeORM** e **PostgreSQL**, atendendo aos requisitos de um desafio técnico proposto.

---

## 🚀 Tecnologias Utilizadas

- Node.js 22.16.0
- NestJS
- TypeORM
- PostgreSQL
- Docker + Docker Compose
- Swagger para documentação
- JWT para autenticação
- Bcrypt para hashing de senhas

---

## 📦 Instalação e Execução

### Pré-requisitos

- Docker
- Docker Compose

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/diegoschaidhauer/url-shortener-teddy.git
cd url-shortener-teddy
```

2. Crie o arquivo `.env` na raiz com o conteúdo:

```
JWT_SECRET=secret123
DB_HOST=postgres
DB_PORT=5432
DB_USER=user
DB_PASS=pass
DB_NAME=shortener
BASE_URL=http://localhost:3000
```

3. Execute a aplicação com Docker Compose:

```bash
docker-compose up --build
```

4. Acesse a documentação Swagger:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 🔐 Autenticação

- `POST /auth/register`: Cria um novo usuário
- `POST /auth/login`: Retorna um `access_token` (JWT)

Use este token como **Bearer Token** nas requisições autenticadas.

---

## 🔗 Endpoints

### ✅ Público

- `POST /shorten`: Encurta uma URL. Se o usuário estiver autenticado, a URL será associada ao seu ID.
- `GET /:code`: Redireciona para a URL original e incrementa o número de cliques.

### 👤 Autenticado

- `GET /user/urls`: Lista URLs do usuário autenticado
- `PATCH /user/urls/:id`: Atualiza a URL
- `DELETE /user/urls/:id`: "Remove" (soft delete) a URL

---

## 🔄 Exemplo de fluxo com token (via Swagger ou Postman)

1. **Crie um usuário** via `/auth/register`
2. **Faça login** via `/auth/login` e copie o `access_token`
3. **Cole o token** como Bearer no Swagger ou na aba "Authorization" do Postman
4. **Use os endpoints autenticados** normalmente

---

## 🧪 Maturidade da API

Este projeto implementa **Maturidade REST nível 2**:
- Uso correto dos verbos HTTP
- Endpoints bem definidos
- Documentação com Swagger
- Autenticação com JWT (sem estado)

---

## 📌 Observações

- O banco de dados é persistente em um volume Docker
- A aplicação realiza soft-delete em URLs
- A contagem de cliques é atualizada sempre que a URL encurtada é acessada

---


