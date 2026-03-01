import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly form: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly successModal: Locator;
  readonly successOverlay: Locator;
  readonly successCloseButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.getByTestId('login-form');
    this.usernameInput = page.getByTestId('login-username-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-btn');
    this.successModal = page.getByTestId('login-success-modal');
    this.successOverlay = page.getByTestId('login-success-overlay');
    this.successCloseButton = page.getByTestId('login-success-close-btn');
    this.errorMessage = page.getByTestId('login-error-message');
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/testing/login');
    await this.page.waitForSelector('[data-testid="login-form"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectSuccess(): Promise<void> {
    await expect(this.successModal).toBeVisible({ timeout: 10000 });
    await expect(this.successOverlay).toBeAttached();
    await expect(this.successCloseButton).toBeVisible();
  }

  async expectError(): Promise<void> {
    await expect(this.submitButton).toBeEnabled({ timeout: 10000 });
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(this.errorMessage).toContainText(/usuario|contraseña|incorrectos/i);
    await expect(this.successOverlay).not.toBeVisible();
    await expect(this.successModal).not.toBeVisible();
  }

  async waitForLoading(): Promise<void> {
    await expect(this.submitButton).toBeEnabled({ timeout: 10000 });
  }
}
