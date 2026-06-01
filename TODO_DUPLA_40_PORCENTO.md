# TODO da Dupla - 40% Restante

Os 3 testes obrigatorios de `frontend/e2e/livros.spec.js` ja passam via Docker. O restante tecnico e completar o contrato da API para todas as telas do frontend, nao apenas livros.

## 1. Completar CRUD de livros

Frontend dependente:

- `frontend/src/services/livroService.js`

Endpoints faltantes:

```text
PUT /livros/:id
DELETE /livros/:id
```

Arquivos sugeridos:

- `src/services/livroService.js`
- `src/controllers/livroController.js`
- `src/routes/livroRoutes.js`
- `tests/livros.test.js`

Criterios:

- Atualizar `titulo` e/ou `autor`.
- Retornar `404` quando o livro nao existir.
- Remover livro por id.

## 2. Completar contrato de usuarios

Frontend dependente:

- `frontend/src/services/usuarioService.js`

Endpoints faltantes:

```text
GET /usuarios
PUT /usuarios/:id
DELETE /usuarios/:id
```

Arquivos sugeridos:

- `src/services/usuarioService.js`
- `src/controllers/usuarioController.js`
- `src/routes/usuarioRoutes.js`
- `tests/usuarios.test.js`

Criterios:

- Listar todos os usuarios.
- Atualizar nome, email, senha e tipo quando enviados.
- Impedir email duplicado na atualizacao.
- Remover usuario por id.
- Retornar `404` para ids inexistentes.

## 3. Completar contrato de emprestimos

Frontend dependente:

- `frontend/src/services/emprestimoService.js`

Endpoints faltantes ou desalinhados:

```text
GET /emprestimos
PUT /emprestimos/:id
DELETE /emprestimos/:id
```

Arquivos sugeridos:

- `src/services/emprestimoService.js`
- `src/controllers/emprestimoController.js`
- `src/routes/emprestimoRoutes.js`
- `tests/emprestimos.test.js`

Criterios:

- Listar todos os emprestimos.
- Aceitar criacao com `livro_id`, `usuario_id` e `data_devolucao_prevista`, conforme o frontend envia.
- Atualizar `status`, `data_devolucao` e `data_devolucao_prevista`.
- Remover emprestimo por id.
- Retornar `404` para ids inexistentes.

## 4. Completar contrato de multas

Frontend dependente:

- `frontend/src/services/multaService.js`

Endpoints faltantes:

```text
GET /multas
PUT /multas/:id
PUT /multas/quitar/:id
DELETE /multas/:id
```

Arquivos sugeridos:

- `src/services/multaService.js`
- `src/controllers/multaController.js`
- `src/routes/multaRoutes.js`
- `tests/multas.test.js`

Criterios:

- Listar todas as multas.
- Atualizar multa por id.
- Quitar multa por id.
- Remover multa por id.
- Retornar `404` para ids inexistentes.

## 5. Adicionar E2E das outras telas

Criar:

```text
frontend/e2e/usuarios.spec.js
frontend/e2e/emprestimos.spec.js
frontend/e2e/multas.spec.js
```

Fluxos sugeridos:

- Navegar ate a tela.
- Criar registro.
- Encontrar registro na lista.
- Abrir modal e cancelar.
- Editar registro.
- Excluir registro.

## Como validar

Rodar a API com testes unitarios:

```powershell
npm.cmd test
```

Rodar tudo via Docker:

```powershell
npm.cmd run docker:e2e
```
