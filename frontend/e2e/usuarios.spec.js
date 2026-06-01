import { test, expect } from '@playwright/test';

test.describe('Gerenciamento de Usuários (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.fill('input[type="email"]', 'admin@sistema.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard|$/);
  });

  test('deve navegar até a tela de usuários e listar os cadastrados', async ({ page }) => {
    await page.goto('/usuarios');
    await expect(page.locator('h2')).toContainText('Gestão de Usuários');
  });

  test('deve permitir adicionar um novo usuário e encontrá-lo na lista', async ({ page }) => {
    const nomeAleatorio = `Usuário E2E ${Math.floor(Math.random() * 10000)}`;
    const emailAleatorio = `e2e-${Math.floor(Math.random() * 10000)}@test.com`;

    await page.goto('/usuarios');
    await page.locator('.fab').click();
    await page.fill('input[name="nome"]', nomeAleatorio);
    await page.fill('input[name="email"]', emailAleatorio);
    await page.fill('input[name="senha"]', '123456');
    await page.selectOption('select[name="tipo"]', 'aluno');
    await page.click('button[type="submit"]');

    await expect(page.locator('.modal')).not.toBeVisible();

    let encontrado = false;
    for (let i = 0; i < 20; i++) {
      await expect(page.locator('.list-cards')).toBeVisible({ timeout: 5000 });

      if (await page.getByText(nomeAleatorio).isVisible()) {
        encontrado = true;
        break;
      }

      const btnProx = page.locator('.pagination button').nth(1);
      if (await btnProx.isVisible() && !(await btnProx.isDisabled())) {
        await btnProx.click({ force: true });
        await page.waitForTimeout(500);
      } else {
        break;
      }
    }

    expect(encontrado).toBeTruthy();
  });

  test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
    await page.goto('/usuarios');

    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.click('button:has-text("Cancelar")');
    await expect(page.locator('.modal')).not.toBeVisible();
  });
});
