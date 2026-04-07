import { LoginPage } from '../page-objects/login.page';
import { appFixtures } from '../fixtures/app.fixture';

const test = appFixtures;

test.describe('Login Functionality', () => {
  test('Successful Login - Happy Path', { tag: ['@smoke'] }, async ({ page }) => {
    // Iniciar screencast con visualización de acciones
    await page.screencast.start({
      path: 'playwright-report/login-exitoso.webm',
    });
    await page.screencast.showActions({ position: 'top-right' });

    // Capítulo inicial: descripción del test
    await page.screencast.showChapter('Login Exitoso', {
      description: 'qa_tester / password123',
      duration: 1000,
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Capítulo: Ingresando credenciales
    await page.screencast.showChapter('Ingresando credenciales', {
      description: 'Usuario: qa_tester',
      duration: 800,
    });

    await loginPage.login('qa_tester', 'password123');

    // Capítulo: Login exitoso
    await page.screencast.showChapter('Login exitoso', {
      description: 'Redirigido al dashboard',
      duration: 1000,
    });

    await loginPage.expectSuccess();

    // Detener screencast (el fixture se encarga de adjuntar al reporte)
    await page.screencast.stop();
  });

  test('Failed Login - Invalid Credentials', { tag: ['@smoke'] }, async ({ page }) => {
    // Iniciar screencast con visualización de acciones
    await page.screencast.start({
      path: 'playwright-report/login-fallido.webm',
    });
    await page.screencast.showActions({ position: 'top-right' });

    // Capítulo inicial: descripción del test
    await page.screencast.showChapter('Login Fallido', {
      description: 'wrong_user / wrong_password',
      duration: 1000,
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Capítulo: Ingresando credenciales inválidas
    await page.screencast.showChapter('Ingresando credenciales inválidas', {
      description: 'Usuario: wrong_user',
      duration: 800,
    });

    await loginPage.login('wrong_user', 'wrong_password');

    // Capítulo: Error de autenticación
    await page.screencast.showChapter('Credenciales inválidas rechazadas', {
      description: 'Permanece en login con mensaje de error',
      duration: 1000,
    });

    await loginPage.expectError();

    // Detener screencast (el fixture se encarga de adjuntar al reporte)
    await page.screencast.stop();
  });
});
