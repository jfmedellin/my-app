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

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1');
    this.subtitle = page.locator('p.text-muted-foreground.mt-2');
    this.newUserButton = page.getByRole('button', { name: 'Nuevo Usuario' });
    this.dialog = page.locator('[role="dialog"]');
    this.emailInput = page.locator('input[type="email"]');
    this.nameInput = page.locator('input[type="text"]');
    this.roleCombobox = page.locator('[role="combobox"]');
    this.saveButton = page.getByRole('button', { name: 'Guardar' });
    this.cancelButton = page.getByRole('button', { name: 'Cancelar' });
    this.deleteButtons = page.locator('button svg.lucide-trash2, button svg.lucide-trash');
    this.editButtons = page.getByRole('button', { name: 'Editar' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/es/testing/users');
    await this.waitForLoadComplete();
  }

  async expectOnPage(): Promise<void> {
    await expect(this.title).toContainText('Gestión de Usuarios');
    await expect(this.subtitle).toContainText('CRUD de usuarios con Supabase');
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
    await this.saveButton.click();
    await this.waitForDialogHidden();
  }

  async selectRole(role: string): Promise<void> {
    await this.roleCombobox.click();
    await this.page.locator('[role="listbox"] [role="option"]', { hasText: role }).click();
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
    await this.saveButton.click();
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
    return this.page.locator(`text=${email}`).isVisible();
  }

  async getFirstUserCard(): Promise<Locator> {
    return this.page.locator('.space-y-2 > div').first();
  }
}
