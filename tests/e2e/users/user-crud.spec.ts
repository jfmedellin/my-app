import { expect } from '@playwright/test';
import { UsersPage } from '../page-objects/users.page';
import { appFixtures } from '../fixtures/app.fixture';

const test = appFixtures;

test.describe('User Management - CRUD', () => {
  let usersPage: UsersPage;

  test.beforeEach(async ({ page }) => {
    usersPage = new UsersPage(page);
    await usersPage.goto();
    await page.waitForTimeout(500);
  });

  test('USR01 - View user list', { tag: ['@smoke'] }, async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-view-list.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Ver Lista de Usuarios', {
      description: 'Visualización del listado de usuarios del sistema',
      duration: 1000,
    });

    await usersPage.expectOnPage();

    await page.screencast.showChapter('Lista cargada exitosamente', {
      description: 'Usuarios visibles en la interfaz',
      duration: 1000,
    });

    await page.screencast.stop();
  });

  test('USR02 - Create new user', { tag: ['@smoke'] }, async ({ page }) => {
    const testEmail = `test${Date.now()}@example.com`;

    await page.screencast.start({ path: 'playwright-report/users-create.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Crear Nuevo Usuario', {
      description: `Creando usuario: ${testEmail}`,
      duration: 1000,
    });

    await usersPage.openCreateUserDialog();

    await page.screencast.showChapter('Formulario de creación abierto', {
      description: 'Ingresando datos del nuevo usuario',
      duration: 800,
    });

    await usersPage.createUser(testEmail, 'Test User', 'Administrador');

    await page.screencast.showChapter('Usuario creado exitosamente', {
      description: `Usuario ${testEmail} aparece en la lista`,
      duration: 1000,
    });

    await expect(page.locator(`text=${testEmail}`)).toBeVisible();

    await page.screencast.stop();
  });

  test('USR03 - Edit existing user', async ({ page }) => {
    const newName = `Editado ${Date.now()}`;

    await page.screencast.start({ path: 'playwright-report/users-edit.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Editar Usuario Existente', {
      description: 'Seleccionando primer usuario para editar',
      duration: 1000,
    });

    await usersPage.openEditUserDialog();

    await page.screencast.showChapter('Formulario de edición abierto', {
      description: `Cambiando nombre a: ${newName}`,
      duration: 800,
    });

    await usersPage.editUser(newName);

    await page.screencast.showChapter('Cambios guardados', {
      description: 'Nombre actualizado correctamente',
      duration: 1000,
    });

    await page.waitForTimeout(2000);

    await page.screencast.stop();
  });

  test('USR04 - Cancel user creation', async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-cancel-create.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Cancelar Creación', {
      description: 'Abriendo formulario y cancelando',
      duration: 1000,
    });

    await usersPage.openCreateUserDialog();
    await usersPage.emailInput.fill('cancel@test.com');
    await usersPage.nameInput.fill('Cancel Test');

    await page.screencast.showChapter('Datos ingresados', {
      description: 'Cancelando sin guardar',
      duration: 800,
    });

    await usersPage.cancelButton.click();
    await usersPage.waitForDialogHidden();

    await page.screencast.showChapter('Creación cancelada', {
      description: 'Usuario no aparece en la lista',
      duration: 1000,
    });

    await expect(page.locator('text=Cancel Test')).not.toBeVisible();

    await page.screencast.stop();
  });

  test('USR05 - Cancel user edit', async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-cancel-edit.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    const firstUser = await usersPage.getFirstUserCard();
    const originalText = await firstUser.textContent();

    await page.screencast.showChapter('Cancelar Edición', {
      description: 'Abriendo edición y cancelando cambios',
      duration: 1000,
    });

    await usersPage.openEditUserDialog();
    await usersPage.nameInput.fill('Nombre Modificado');

    await page.screencast.showChapter('Cambios descartados', {
      description: 'Volviendo al estado original',
      duration: 800,
    });

    await usersPage.cancelEdit();

    const newText = await firstUser.textContent();
    expect(newText).not.toContain('Nombre Modificado');

    await page.screencast.showChapter('Edición cancelada', {
      description: 'Usuario sin cambios',
      duration: 1000,
    });

    await page.screencast.stop();
  });

  test('USR06 - Delete user with confirmation', async ({ page, handleDialog }) => {
    await page.screencast.start({ path: 'playwright-report/users-delete.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Eliminar Usuario', {
      description: 'Confirmando eliminación de usuario',
      duration: 1000,
    });

    await handleDialog('accept', async () => {
      await usersPage.deleteUser(true);
    });

    await page.screencast.showChapter('Usuario eliminado', {
      description: 'Usuario removido de la lista',
      duration: 1000,
    });

    await page.screencast.stop();
  });

  test('USR07 - Cancel user deletion', async ({ page, handleDialog }) => {
    await page.screencast.start({ path: 'playwright-report/users-cancel-delete.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Cancelar Eliminación', {
      description: 'Descartando eliminación de usuario',
      duration: 1000,
    });

    await handleDialog('dismiss', async () => {
      await usersPage.deleteUser(false);
    });

    await page.screencast.showChapter('Eliminación cancelada', {
      description: 'Usuario permanece en la lista',
      duration: 1000,
    });

    await page.screencast.stop();
  });

  test('USR08 - Change user role', async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-change-role.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Cambiar Rol de Usuario', {
      description: 'Actualizando rol a Editor',
      duration: 1000,
    });

    await usersPage.openEditUserDialog();

    await page.screencast.showChapter('Seleccionando nuevo rol', {
      description: 'Cambiando a rol Editor',
      duration: 800,
    });

    await usersPage.selectRole('Editor');
    await usersPage.saveButton.click();

    await page.screencast.showChapter('Rol actualizado', {
      description: 'Cambios guardados correctamente',
      duration: 1000,
    });

    await page.waitForTimeout(2000);

    await page.screencast.stop();
  });

  test('VA01 - Navigation', async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-navigation.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Navegación', {
      description: 'Verificando enlaces de navegación',
      duration: 1000,
    });

    const links = page.locator('a[href]');
    await expect(links.first()).toBeVisible();

    await page.screencast.stop();
  });

  test('VA02 - Toggle locale', async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-locale.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Cambiar Idioma', {
      description: 'Toggle entre español e inglés',
      duration: 1000,
    });

    const localeButton = page.locator('button:has-text("Toggle locale")');
    if (await localeButton.isVisible()) {
      await localeButton.click();
    }

    await page.screencast.stop();
  });

  test('VA03 - Toggle theme', async ({ page }) => {
    await page.screencast.start({ path: 'playwright-report/users-theme.webm' });
    await page.screencast.showActions({ position: 'top-right' });

    await page.screencast.showChapter('Cambiar Tema', {
      description: 'Alternar entre modo claro y oscuro',
      duration: 1000,
    });

    const themeButton = page.locator('button:has-text("Toggle theme")');
    if (await themeButton.isVisible()) {
      await themeButton.click();
    }

    await page.screencast.stop();
  });
});
