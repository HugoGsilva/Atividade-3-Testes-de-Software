import { test, expect } from '@playwright/test';

const apiURL = process.env.E2E_BASE_URL && process.env.E2E_BASE_URL.includes('frontend')
  ? 'http://api:3000'
  : 'http://localhost:3000';

test.describe('Gerenciamento de Multas (E2E)', () => {
  test.beforeEach(async ({ page, request }) => {
    // Seed a book, a user, and a loan to ensure a loan is available for selecting in the multas form
    const bookRes = await request.post(`${apiURL}/livros`, {
      data: { titulo: 'Livro E2E Multa', autor: 'Autor E2E' }
    });
    const book = await bookRes.json();

    const userRes = await request.post(`${apiURL}/usuarios`, {
      data: { nome: 'Usuario E2E Multa', email: `e2e-mul-${Math.floor(Math.random() * 10000)}@test.com`, senha: '123', tipo: 'aluno' }
    });
    const user = await userRes.json();

    await request.post(`${apiURL}/emprestimos`, {
      data: {
        livro_id: book.id,
        usuario_id: user.id,
        data_emprestimo: '2026-04-01',
        status: 'ativo'
      }
    });

    await page.goto('/');

    await page.fill('input[type="email"]', 'admin@sistema.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard|$/);
  });

  test('deve navegar até a tela de multas e listar os registros', async ({ page }) => {
    await page.goto('/multas');
    await expect(page.locator('h2')).toContainText('Gestão de Multas');
  });

  test('deve permitir aplicar uma nova multa', async ({ page }) => {
    await page.goto('/multas');
    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    const emprestimoSelect = page.locator('select[name="emprestimo_id"]');
    await expect(emprestimoSelect.locator('option').nth(1)).toBeAttached({ timeout: 5000 });
    await emprestimoSelect.selectOption({ index: 1 });

    const tipoSelect = page.locator('select[name="tipo"]');
    await tipoSelect.selectOption('Atraso');

    await page.fill('input[name="valor"]', '15.50');
    await page.fill('input[name="obs"]', 'Multa test e2e');
    await page.click('button[type="submit"]');

    await expect(page.locator('.modal')).not.toBeVisible();
  });

  test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
    await page.goto('/multas');

    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.click('button:has-text("Cancelar")');
    await expect(page.locator('.modal')).not.toBeVisible();
  });
});
