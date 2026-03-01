import { expect } from '@playwright/test';
import { FormsPage } from '../pom/forms.page';
import { appFixtures } from '../fixtures/app.fixture';

const test = appFixtures;

test.describe('Basic Forms - Primer Formulario', () => {
  let formsPage: FormsPage;

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.goto();
  });

  test('ESC01: Happy Path - Envío exitoso del formulario', { tag: ['@smoke'] }, async () => {
    await formsPage.fillForm({
      text: 'Test texto',
      password: 'password123',
      number: '50',
      textarea: 'Comentario de prueba',
      email: 'test@ejemplo.com',
      select: 'Option 1',
      checkOp1: true,
      radioOp1: true,
      terms: true,
    });
    await formsPage.submit();
    await formsPage.expectUrlContains('testing/forms/basic');
  });

  test('ESC02: Validación de correo electrónico requerido', async () => {
    await formsPage.submit();
    await formsPage.expectEmailRequired();
  });

  test('ESC03: Validación de formato de correo electrónico', async () => {
    const isValid = await formsPage.expectEmailInvalid('correo-invalido');
    expect(isValid).toBe(false);
  });

  test('ESC04: Validación de contraseña - menos de 8 caracteres', async () => {
    await formsPage.expectPasswordMinLength('8');
    await formsPage.passwordInput.fill('123');
    const valueLength = await formsPage.passwordInput.inputValue();
    expect(valueLength.length).toBeLessThan(8);
  });

  test('ESC05: Validación de número - valor menor al mínimo', async () => {
    await formsPage.expectNumberRange('1', '100');
    await formsPage.expectNumberValid('0', false);
  });

  test('ESC06: Validación de número - valor mayor al máximo', async () => {
    await formsPage.expectNumberValid('101', false);
  });

  test('ESC07: Validación de número - valor dentro del rango', async () => {
    await formsPage.expectNumberValid('50', true);
  });

  test('ESC08: Campo deshabilitado - texto no editable', async () => {
    await formsPage.expectDisabledInputDisabled();
  });

  test('ESC09: Checkbox deshabilitado no interactuable', async () => {
    await formsPage.expectDisabledCheckboxDisabled();
  });

  test('ESC10: Radio button deshabilitado no selectable', async () => {
    await formsPage.expectDisabledRadioDisabled();
  });

  test('ESC11: Campo solo lectura no editable', async () => {
    await formsPage.expectReadonlyInput();
  });

  test('ESC12: Botón Limpiar resetea los campos del formulario', async () => {
    await formsPage.fillForm({ email: 'test@test.com', select: 'Option 1', terms: true });
    await formsPage.reset();
    await formsPage.expectFormReset();
  });

  test('ESC13: Checkbox Opción 2 marcado por defecto', async () => {
    await formsPage.expectCheckOp2Checked();
  });

  test('ESC14: Validación de términos requeridos', async () => {
    await formsPage.expectTermsRequired();
  });

  test('ESC15: Validación de selector requerido', async () => {
    await formsPage.expectSelectRequired();
  });
});
