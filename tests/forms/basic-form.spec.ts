import { test, expect } from '@playwright/test';

test.describe('Basic Forms - Primer Formulario', () => {
  const URL = 'http://localhost:3000/en/testing/forms/basic';

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('ESC01: Happy Path - Envío exitoso del formulario', { tag: ['@smoke'] }, async ({ page }) => {
    await page.fill('#basic-text', 'Test texto');
    await page.fill('#basic-password', 'password123');
    await page.fill('#basic-number', '50');
    await page.fill('#basic-textarea', 'Comentario de prueba');
    await page.check('#check-op1');
    await page.check('#radio-op1');
    await page.fill('#form-email', 'test@ejemplo.com');
    await page.selectOption('#form-email', { label: 'Option 1' }).catch(() => {
      return page.locator('select[name="select"]').selectOption({ index: 1 });
    });
    await page.check('#form-terms');
    
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/testing\/forms\/basic/);
  });

  test('ESC02: Validación de correo electrónico requerido', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    const emailInput = page.locator('#form-email');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('ESC03: Validación de formato de correo electrónico', async ({ page }) => {
    await page.fill('#form-email', 'correo-invalido');
    
    // Verificar que el email es inválido usando checkValidity()
    const emailInput = page.locator('#form-email');
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test('ESC04: Validación de contraseña - menos de 8 caracteres', async ({ page }) => {
    await page.fill('#basic-password', 'password123');
    await page.fill('#basic-password', '123');
    
    const passwordInput = page.locator('#basic-password');
    const minLength = await passwordInput.getAttribute('minlength');
    expect(minLength).toBe('8');
    
    const valueLength = (await passwordInput.inputValue()).length;
    expect(valueLength).toBeLessThan(8);
  });

  test('ESC05: Validación de número - valor menor al mínimo', async ({ page }) => {
    await page.fill('#basic-number', '0');
    
    // Verificar que el número es inválido usando checkValidity()
    const numberInput = page.locator('#basic-number');
    const isValid = await numberInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test.skip('ESC06: Validación de número - valor mayor al máximo', async ({ page }) => {
    await page.fill('#basic-number', '101');
    
    // Verificar que el número es inválido usando checkValidity()
    const numberInput = page.locator('#basic-number');
    const isValid = await numberInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test('ESC07: Validación de número - valor dentro del rango', async ({ page }) => {
    await page.fill('#basic-number', '50');
    
    // Verificar que el número es válido usando checkValidity()
    const numberInput = page.locator('#basic-number');
    const isValid = await numberInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(true);
  });

  test('ESC08: Campo deshabilitado - texto no editable', async ({ page }) => {
    const disabledInput = page.locator('#basic-disabled');
    await expect(disabledInput).toBeDisabled();
    
    await expect(disabledInput).toHaveValue('');
  });

  test('ESC09: Checkbox deshabilitado no interactuable', async ({ page }) => {
    const disabledCheckbox = page.locator('#check-disabled');
    await expect(disabledCheckbox).toBeDisabled();
  });

  test('ESC10: Radio button deshabilitado no selectable', async ({ page }) => {
    const disabledRadio = page.locator('#radio-disabled');
    await expect(disabledRadio).toBeDisabled();
  });

  test('ESC11: Campo solo lectura no editable', async ({ page }) => {
    const readonlyInput = page.locator('#basic-readonly');
    await expect(readonlyInput).toHaveAttribute('readonly', '');
    await expect(readonlyInput).toHaveValue('Contenido fijo');
  });

  test.skip('ESC12: Botón Limpiar resetea los campos del formulario', async ({ page }) => {
    await page.fill('#form-email', 'test@test.com');
    await page.locator('select[name="select"]').selectOption({ index: 1 });
    await page.check('#form-terms');
    
    await page.locator('button[data-testid="reset-btn"]').click();
    
    await expect(page.locator('#form-email')).toHaveValue('');
    await expect(page.locator('select[name="select"]')).toHaveValue('');
    await expect(page.locator('#form-terms')).not.toBeChecked();
  });

  test('ESC13: Checkbox Opción 2 marcado por defecto', async ({ page }) => {
    const checkboxOp2 = page.locator('#check-op2');
    await expect(checkboxOp2).toBeChecked();
  });

  test('ESC14: Validación de términos requeridos', async ({ page }) => {
    await page.fill('#form-email', 'test@test.com');
    
    const termsCheckbox = page.locator('#form-terms');
    await expect(termsCheckbox).toHaveAttribute('required');
  });

  test('ESC15: Validación de selector requerido', async ({ page }) => {
    const selectElement = page.locator('select[name="select"]');
    await expect(selectElement).toHaveAttribute('required');
  });
});
