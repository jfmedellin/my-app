import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getByRole(
    role: 'button' | 'textbox' | 'combobox' | 'link',
    options?: Parameters<Locator['getByRole']>[1]
  ): Locator {
    return this.page.getByRole(role, options);
  }

  protected getByLabel(label: string, options?: Parameters<Locator['getByLabel']>[1]): Locator {
    return this.page.getByLabel(label, options);
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async clickButton(text: string): Promise<void> {
    await this.getByRole('button', { name: text }).click();
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.locator(selector).fill(value);
  }

  async waitForDialog(): Promise<Locator> {
    return this.locator('[role="dialog"]');
  }

  async waitForDialogHidden(): Promise<void> {
    await this.locator('[role="dialog"]').waitFor({ state: 'hidden', timeout: 15000 });
  }

  async expectVisible(selector: string): Promise<Locator> {
    return this.locator(selector);
  }

  async expectText(selector: string, text: string): Promise<void> {
    await expect(this.locator(selector)).toContainText(text);
  }

  async expectUrlContains(urlPart: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  async waitForLoadComplete(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
