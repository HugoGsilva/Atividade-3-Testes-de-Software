import { test, expect } from '@playwright/test';

const apiURL = process.env.E2E_BASE_URL && process.env.E2E_BASE_URL.includes('frontend')
  ? 'http://api:3000'
  : 'http://localhost:3000';

test.describe('Gerenciamento de Empréstimos (E2E)', () => {
  test.beforeEach(async ({ page, request }) => {
    // Seed a book and user to ensure options are available
    await request.post(`${apiURL}/livros`, {
      data: { titulo: 'Livro E2E Emprestimo', autor: 'Autor E2E' }
    });
    await request.post(`${apiURL}/usuarios`, {
      data: { nome: 'Usuario E2E Emprestimo', email: `e2e-emp-${Math.floor(Math.random() * 10000)}@test.com`, senha: '123', tipo: 'aluno' }
    });

    await page.goto('/');

    await page.fill('input[type="email"]', 'admin@sistema.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard|$/);
  });

  test('deve navegar até a tela de empréstimos e listar os registros', async ({ page }) => {
    await page.goto('/emprestimos');
    await expect(page.locator('h2')).toContainText('Empréstimos');
  });

  test('deve permitir registrar um novo empréstimo', async ({ page }) => {
    await page.goto('/emprestimos');
    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    const livroSelect = page.locator('select[name="livro_id"]');
    await expect(livroSelect.locator('option').nth(1)).toBeAttached({ timeout: 5000 });
    await livroSelect.selectOption({ index: 1 });

    const usuarioSelect = page.locator('select[name="usuario_id"]');
    await expect(usuarioSelect.locator('option').nth(1)).toBeAttached({ timeout: 5000 });
    await usuarioSelect.selectOption({ index: 1 });

    await page.fill('input[name="data_devolucao_prevista"]', '2026-12-31');
    await page.click('button[type="submit"]');

    await expect(page.locator('.modal')).not.toBeVisible();
  });

  test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
    await page.goto('/emprestimos');

    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.click('button:has-text("Cancelar")');
    await expect(page.locator('.modal')).not.toBeVisible();
  });
});
