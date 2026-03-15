import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class UsersPage extends BasePage {
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly newUserButton: Locator;
  readonly dialog: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly roleCombobox: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly deleteButtons: Locator;
  readonly editButtons: Locator;
  readonly roleOption: (role: string) => Locator;
  readonly userCardByText: (text: string) => Locator;
  readonly userCard: Locator;
  readonly createButton: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1');
    this.subtitle = page.locator('p.text-muted-foreground.mt-1');
    this.newUserButton = page.getByRole('button', { name: 'Nuevo Usuario' });
    this.dialog = page.locator('[role="dialog"]');
    this.emailInput = page.locator('input[type="email"]');
    this.nameInput = page.locator('input[type="text"]');
    this.roleCombobox = page.locator('[role="combobox"]');
    this.createButton = page.getByRole('button', { name: 'Crear usuario' });
    this.saveChangesButton = page.getByRole('button', { name: 'Guardar cambios' });
    this.saveButton = this.createButton.or(this.saveChangesButton);
    this.cancelButton = page.getByRole('button', { name: 'Cancelar' });
    this.deleteButtons = page.locator('button svg.lucide-trash2, button svg.lucide-trash');
    this.editButtons = page
      .locator('button svg.lucide-pencil, button svg.lucide-pencil')
      .locator('..');
    this.roleOption = (role: string) =>
      page.locator('[role="listbox"] [role="option"]').filter({ hasText: role });
    this.userCardByText = (text: string) => page.getByText(text, { exact: false });
    this.userCard = page.locator('div.rounded-lg.border.border-border\\/50');
  }

  async goto(): Promise<void> {
    await this.page.goto('/es/testing/users');
    await this.waitForLoadComplete();
  }

  async expectOnPage(): Promise<void> {
    await expect(this.title).toContainText('Usuarios del Sistema');
    await expect(this.subtitle).toContainText('usuario');
    await expect(this.newUserButton).toBeVisible();
  }

  async openCreateUserDialog(): Promise<void> {
    await this.newUserButton.click();
    await this.dialog.waitFor({ state: 'visible' });
  }

  async createUser(email: string, name: string, role: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.selectRole(role);
    await this.createButton.click();
    await this.page.waitForTimeout(1000);
    await this.dialog.waitFor({ state: 'hidden', timeout: 20000 });
  }

  async selectRole(role: string): Promise<void> {
    await this.roleCombobox.click();
    await this.roleOption(role).click();
  }

  async openEditUserDialog(): Promise<void> {
    await this.editButtons.first().click();
    await this.dialog.waitFor({ state: 'visible' });
  }

  async editUser(name: string, role?: string): Promise<void> {
    await this.nameInput.fill(name);
    if (role) {
      await this.selectRole(role);
    }
    await this.saveChangesButton.click();
    await this.page.waitForTimeout(1000);
  }

  async cancelEdit(): Promise<void> {
    await this.cancelButton.click();
    await this.waitForDialogHidden();
  }

  async deleteUser(accept: boolean): Promise<void> {
    const deleteBtn = this.deleteButtons.first();
    await deleteBtn.click();
    if (accept) {
      await this.page.waitForTimeout(500);
    }
  }

  async userExists(email: string): Promise<boolean> {
    return this.userCardByText(email).isVisible();
  }

  async getFirstUserCard(): Promise<Locator> {
    return this.userCard.first();
  }
}
