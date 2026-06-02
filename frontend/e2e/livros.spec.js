import { test, expect } from '@playwright/test';

const apiURL = process.env.E2E_BASE_URL && process.env.E2E_BASE_URL.includes('frontend')
  ? 'http://api:3000'
  : 'http://localhost:3000';

test.describe('Gerenciamento de Livros (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="email"]', 'admin@sistema.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard|$/);
  });

  test('deve navegar ate a tela de livros e listar o acervo', async ({ page }) => {
    await page.goto('/livros');
    await expect(page.locator('h2')).toContainText('Acervo de Livros');
  });

  test('deve permitir adicionar um novo livro e encontra-lo na lista', async ({ page, request }) => {
    const tituloAleatorio = `Livro E2E ${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    await page.goto('/livros');
    await page.locator('.fab').click();
    await page.fill('input[name="titulo"]', tituloAleatorio);
    await page.fill('input[name="autor"]', 'Automacao Playwright');
    await page.click('button[type="submit"]');

    await expect(page.locator('.modal')).not.toBeVisible();

    const livros = await (await request.get(`${apiURL}/livros`)).json();
    const criado = livros.find((livro) => livro.titulo === tituloAleatorio);
    expect(criado).toBeTruthy();

    await page.fill('input[placeholder="Buscar por ID..."]', String(criado.id));
    await page.locator('.search-bar button').click();
    await expect(page.getByText(tituloAleatorio)).toBeVisible();
  });

  test('deve fechar o modal ao clicar no botao cancelar', async ({ page }) => {
    await page.goto('/livros');

    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.click('button:has-text("Cancelar")');
    await expect(page.locator('.modal')).not.toBeVisible();
  });
});
