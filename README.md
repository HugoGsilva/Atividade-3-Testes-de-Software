# ATIVIDADE-03-TESTES-DE-SOFTWARE

Projeto backend desenvolvido com **Node.js**, **Express** e **Sequelize** para a disciplina de Testes de Software.

## Tecnologias

- Node.js 20
- Express
- Sequelize ORM
- SQLite (modo teste)
- MySQL (modo desenvolvimento)
- Jest + Supertest
- Docker & Docker Compose

## Estrutura de Testes

| Arquivo de teste | Quantidade | Cenários cobertos |
|------------------|------------|-------------------|
| `livros.test.js` | 5 passes | POST (sucesso e campo ausente), GET/:id (existente e 404), campos retornados |
| `usuarios.test.js` | 5 passes | POST (sucesso e campo ausente), GET/:id (existente e 404), email duplicado |
| `emprestimos.test.js` | 5 passes | POST (sucesso e campo ausente), GET/:id (existente e 404), campos retornados |
| `multas.test.js` | 5 passes | POST (sucesso e campo ausente), GET/:id (existente e 404), valor como número |
| **Total** | **20 testes** | |

---

## Como testar com Docker

A imagem Docker utiliza **Alpine Linux** (leve) e já vem configurada com **timeouts longos** para rodar sem travamentos em computadores com poucos recursos.

### 1. Build da imagem

```bash
docker build -t atividade03-testes .
```

### 2. Executar os testes

```bash
docker run --rm -e NODE_ENV=test atividade03-testes npm test
```

> O parâmetro `--rm` remove o container automaticamente ao final.

### 3. Subir a API com Docker Compose

```bash
docker-compose up -d
```

Aguarde o container ficar saudável. O `healthcheck` está configurado com **start-period de 120 segundos** para não marcar como falho em máquinas lentas.

Verifique o status:

```bash
docker ps
```

A API estará disponível em: `http://localhost:3000`

### 4. Rodar testes no container em execução

```bash
docker exec atividade03-testes npm test
```

### 5. Parar a aplicação

```bash
docker-compose down
```

---

## Scripts disponíveis

```bash
npm test          # Executa todos os testes com Jest (timeout 30s)
npm start         # Inicia a aplicação em produção
npm run dev       # Inicia com nodemon (desenvolvimento)
```

---

## Variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=biblioteca
DB_PORT=3306
PORT=3000
```

No modo **teste**, o banco utilizado é o **SQLite em memória** (`:memory:`), não sendo necessário configurar MySQL para rodar os testes.
