import { LoginPage } from '../page-objects/login.page';
import { appFixtures } from '../fixtures/app.fixture';

const test = appFixtures;

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login - Happy Path', { tag: ['@smoke'] }, async () => {
    await loginPage.login('qa_tester', 'password123');
    await loginPage.expectSuccess();
  });

  test('Failed Login - Invalid Credentials', { tag: ['@smoke'] }, async () => {
    await loginPage.login('wrong_user', 'wrong_password');
    await loginPage.expectError();
  });
});
