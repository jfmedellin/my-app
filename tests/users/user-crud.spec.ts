import { expect } from '@playwright/test';
import { UsersPage } from '../pom/users.page';
import { appFixtures } from '../fixtures/app.fixture';

const test = appFixtures;

test.describe('User Management - CRUD', () => {
  let usersPage: UsersPage;

  test.beforeEach(async ({ page }) => {
    usersPage = new UsersPage(page);
    await usersPage.goto();
  });

  test('USR01 - View user list', { tag: ['@smoke'] }, async () => {
    await usersPage.expectOnPage();
  });

  test('USR02 - Create new user', { tag: ['@smoke'] }, async ({ page }) => {
    const testEmail = `test${Date.now()}@example.com`;
    await usersPage.openCreateUserDialog();
    await usersPage.createUser(testEmail, 'Test User', 'Administrador');
    await expect(page.locator(`text=${testEmail}`)).toBeVisible();
  });

  test('USR03 - Edit existing user', async ({ page }) => {
    await usersPage.openEditUserDialog();
    await usersPage.editUser(`Editado ${Date.now()}`);
    await page.waitForTimeout(2000);
  });

  test('USR04 - Cancel user creation', async ({ page }) => {
    await usersPage.openCreateUserDialog();
    await usersPage.emailInput.fill('cancel@test.com');
    await usersPage.nameInput.fill('Cancel Test');
    await usersPage.cancelButton.click();
    await usersPage.waitForDialogHidden();
    await expect(page.locator('text=Cancel Test')).not.toBeVisible();
  });

  test('USR05 - Cancel user edit', async () => {
    const firstUser = await usersPage.getFirstUserCard();

    await usersPage.openEditUserDialog();
    await usersPage.nameInput.fill('Nombre Modificado');
    await usersPage.cancelEdit();

    const newText = await firstUser.textContent();
    expect(newText).not.toContain('Nombre Modificado');
  });

  test('USR06 - Delete user with confirmation', async ({ handleDialog }) => {
    await handleDialog('accept', async () => {
      await usersPage.deleteUser(true);
    });
  });

  test('USR07 - Cancel user deletion', async ({ handleDialog }) => {
    await handleDialog('dismiss', async () => {
      await usersPage.deleteUser(false);
    });
  });

  test('USR08 - Change user role', async ({ page }) => {
    await usersPage.openEditUserDialog();
    await usersPage.selectRole('Editor');
    await usersPage.saveButton.click();
    await page.waitForTimeout(2000);
  });

  test('VA01 - Navigation', async ({ page }) => {
    const links = page.locator('a[href]');
    await expect(links.first()).toBeVisible();
  });

  test('VA02 - Toggle locale', async ({ page }) => {
    const localeButton = page.locator('button:has-text("Toggle locale")');
    if (await localeButton.isVisible()) {
      await localeButton.click();
    }
  });

  test('VA03 - Toggle theme', async ({ page }) => {
    const themeButton = page.locator('button:has-text("Toggle theme")');
    if (await themeButton.isVisible()) {
      await themeButton.click();
    }
  });
});
