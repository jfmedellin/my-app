import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface FormData {
  text?: string;
  password?: string;
  number?: string;
  textarea?: string;
  email?: string;
  select?: string;
  terms?: boolean;
  checkOp1?: boolean;
  radioOp1?: boolean;
}

export class FormsPage extends BasePage {
  readonly textInput: Locator;
  readonly passwordInput: Locator;
  readonly numberInput: Locator;
  readonly textareaInput: Locator;
  readonly emailInput: Locator;
  readonly selectInput: Locator;
  readonly selectCombobox: Locator;
  readonly termsCheckbox: Locator;
  readonly checkOp1: Locator;
  readonly checkOp2: Locator;
  readonly radioOp1: Locator;
  readonly radioDisabled: Locator;
  readonly disabledInput: Locator;
  readonly disabledCheckbox: Locator;
  readonly readonlyInput: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.textInput = page.locator('#basic-text');
    this.passwordInput = page.locator('#basic-password');
    this.numberInput = page.locator('#basic-number');
    this.textareaInput = page.locator('#basic-textarea');
    this.emailInput = page.locator('#form-email');
    this.selectInput = page.locator('select[name="select"]');
    this.selectCombobox = page.locator('[role="combobox"]');
    this.termsCheckbox = page.locator('#form-terms');
    this.checkOp1 = page.locator('#check-op1');
    this.checkOp2 = page.locator('#check-op2');
    this.radioOp1 = page.locator('#radio-op1');
    this.radioDisabled = page.locator('#radio-disabled');
    this.disabledInput = page.locator('#basic-disabled');
    this.disabledCheckbox = page.locator('#check-disabled');
    this.readonlyInput = page.locator('#basic-readonly');
    this.submitButton = page.locator('button[type="submit"]');
    this.resetButton = page.locator('button[data-testid="reset-btn"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/testing/forms/basic');
    await this.waitForLoadComplete();
  }

  async fillForm(data: FormData): Promise<void> {
    if (data.text) await this.textInput.fill(data.text);
    if (data.password) await this.passwordInput.fill(data.password);
    if (data.number) await this.numberInput.fill(data.number);
    if (data.textarea) await this.textareaInput.fill(data.textarea);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.select) {
      await this.selectCombobox.first().click();
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    if (data.checkOp1) await this.checkOp1.check();
    if (data.radioOp1) await this.radioOp1.check();
    if (data.terms) await this.termsCheckbox.check();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async reset(): Promise<void> {
    await this.resetButton.click();
  }

  async expectEmailRequired(): Promise<void> {
    await expect(this.emailInput).toHaveAttribute('required');
  }

  async expectEmailInvalid(email: string): Promise<boolean> {
    await this.emailInput.fill(email);
    return this.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
  }

  async expectPasswordMinLength(expected: string): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('minlength', expected);
  }

  async expectNumberRange(min: string, max: string): Promise<void> {
    await expect(this.numberInput).toHaveAttribute('min', min);
    await expect(this.numberInput).toHaveAttribute('max', max);
  }

  async expectNumberValid(value: string, isValid: boolean): Promise<void> {
    await this.numberInput.fill(value);
    await expect(this.numberInput).toHaveJSProperty('validity.valid', isValid);
  }

  async expectDisabledInputDisabled(): Promise<void> {
    await expect(this.disabledInput).toBeDisabled();
    await expect(this.disabledInput).toHaveValue('');
  }

  async expectDisabledCheckboxDisabled(): Promise<void> {
    await expect(this.disabledCheckbox).toBeDisabled();
  }

  async expectDisabledRadioDisabled(): Promise<void> {
    await expect(this.radioDisabled).toBeDisabled();
  }

  async expectReadonlyInput(): Promise<void> {
    await expect(this.readonlyInput).toHaveAttribute('readonly', '');
    await expect(this.readonlyInput).toHaveValue('Contenido fijo');
  }

  async expectCheckOp2Checked(): Promise<void> {
    await expect(this.checkOp2).toBeChecked();
  }

  async expectTermsRequired(): Promise<void> {
    await expect(this.termsCheckbox).toHaveAttribute('required');
  }

  async expectSelectRequired(): Promise<void> {
    await expect(this.selectInput).toHaveAttribute('required');
  }

  async expectFormReset(): Promise<void> {
    await expect(this.emailInput).toHaveValue('');
    await expect(this.termsCheckbox).not.toBeChecked();
  }
}
