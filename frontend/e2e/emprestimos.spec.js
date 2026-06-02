import { test, expect } from '@playwright/test';

const apiURL = process.env.E2E_BASE_URL && process.env.E2E_BASE_URL.includes('frontend')
  ? 'http://api:3000'
  : 'http://localhost:3000';

async function login(page) {
  await page.goto('/');
  await page.fill('input[type="email"]', 'admin@sistema.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/dashboard|$/);
}

async function criarLivroUsuario(request, prefixo = 'Emprestimo') {
  const sufixo = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const livro = await request.post(`${apiURL}/livros`, {
    data: { titulo: `Livro E2E ${prefixo} ${sufixo}`, autor: 'Autor E2E' },
  });
  expect(livro.ok()).toBeTruthy();

  const usuario = await request.post(`${apiURL}/usuarios`, {
    data: {
      nome: `Usuario E2E ${prefixo} ${sufixo}`,
      email: `e2e-emp-${sufixo}@test.com`,
      senha: '123456',
      tipo: 'aluno',
    },
  });
  expect(usuario.ok()).toBeTruthy();

  return {
    livro: await livro.json(),
    usuario: await usuario.json(),
  };
}

async function criarEmprestimo(request, dataDevolucaoPrevista = '2026-12-31') {
  const { livro, usuario } = await criarLivroUsuario(request);
  const emprestimo = await request.post(`${apiURL}/emprestimos`, {
    data: {
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_devolucao_prevista: dataDevolucaoPrevista,
    },
  });
  expect(emprestimo.ok()).toBeTruthy();

  return {
    livro,
    usuario,
    emprestimo: await emprestimo.json(),
  };
}

async function encontrarCardEmprestimo(page, livroId) {
  const card = page.locator('.list-card', { hasText: `Livro #${livroId}` });
  await expect(card).toBeVisible({ timeout: 5000 });
  return card;
}

test.describe('Gerenciamento de Emprestimos (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('deve navegar ate a tela de emprestimos e listar os registros', async ({ page, request }) => {
    const { livro } = await criarEmprestimo(request);

    await page.goto('/emprestimos');

    await expect(page.locator('h2')).toContainText(/Empr.*stimos/);
    await encontrarCardEmprestimo(page, livro.id);
  });

  test('deve permitir registrar um novo emprestimo e encontra-lo na lista', async ({ page, request }) => {
    const { livro, usuario } = await criarLivroUsuario(request, 'Cadastro');

    await page.goto('/emprestimos');
    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.locator('select[name="livro_id"]').selectOption(String(livro.id));
    await page.locator('select[name="usuario_id"]').selectOption(String(usuario.id));
    await page.fill('input[name="data_devolucao_prevista"]', '2026-12-31');
    await page.click('button[type="submit"]');

    await expect(page.locator('.modal')).not.toBeVisible();
    await expect(page.locator('.alert--success')).toContainText('registrado com sucesso');
    await encontrarCardEmprestimo(page, livro.id);
  });

  test('deve fechar o modal ao clicar no botao cancelar', async ({ page }) => {
    await page.goto('/emprestimos');

    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.click('button:has-text("Cancelar")');
    await expect(page.locator('.modal')).not.toBeVisible();
  });

  test('deve editar a data prevista de devolucao de um emprestimo', async ({ page, request }) => {
    const { livro, emprestimo } = await criarEmprestimo(request, '2026-12-31');

    await page.goto('/emprestimos');
    const card = await encontrarCardEmprestimo(page, livro.id);
    await card.locator('.list-card__actions button').nth(1).click();

    await expect(page.locator('.modal')).toBeVisible();
    await page.fill('input[name="data_devolucao_prevista"]', '2027-01-15');
    await page.click('button[type="submit"]');

    await expect(page.locator('.modal')).not.toBeVisible();
    await expect(page.locator('.alert--success')).toContainText('atualizado com sucesso');

    const atualizado = await request.get(`${apiURL}/emprestimos/${emprestimo.id}`);
    expect(atualizado.ok()).toBeTruthy();
    expect((await atualizado.json()).data_devolucao_prevista).toContain('2027-01-15');
  });

  test('deve registrar a devolucao de um emprestimo ativo', async ({ page, request }) => {
    const { livro, emprestimo } = await criarEmprestimo(request);

    await page.goto('/emprestimos');
    const card = await encontrarCardEmprestimo(page, livro.id);
    await card.getByRole('button', { name: 'Devolver' }).click();

    await expect(page.locator('.modal')).toBeVisible();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('.alert--success')).toContainText(/conclu/i);

    const atualizado = await request.get(`${apiURL}/emprestimos/${emprestimo.id}`);
    expect(atualizado.ok()).toBeTruthy();
    expect((await atualizado.json()).data_devolucao).toBeTruthy();
  });

  test('deve excluir um emprestimo', async ({ page, request }) => {
    const { livro, emprestimo } = await criarEmprestimo(request);

    await page.goto('/emprestimos');
    const card = await encontrarCardEmprestimo(page, livro.id);
    await card.locator('.list-card__actions button').nth(2).click();

    await expect(page.locator('.modal')).toBeVisible();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.locator('.alert--success')).toContainText(/exclu/i);

    const removido = await request.get(`${apiURL}/emprestimos/${emprestimo.id}`);
    expect(removido.status()).toBe(404);
  });
});
