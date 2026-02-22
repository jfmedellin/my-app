// spec: login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Successful Login - Happy Path', async ({ page }) => {
    // Navigate to the login page (with explicit locale)
    await page.goto('http://localhost:3000/en/testing/login');

    // Wait for the form to be loaded
    await page.waitForSelector('[data-testid="login-form"]');

    // Fill username input with 'qa_tester'
    const usernameInput = page.locator('[data-testid="login-username-input"]');
    await usernameInput.fill('qa_tester');

    // Fill password input with 'password123'
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    await passwordInput.fill('password123');

    // Click the submit button
    const submitButton = page.locator('[data-testid="login-submit-btn"]');
    await submitButton.click();

    // Wait for the success modal to appear
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 10000 });

    // Verify the success overlay exists (element is present in DOM)
    const successOverlay = page.locator('[data-testid="login-success-overlay"]');
    await expect(successOverlay).toBeAttached();

    // Verify the success modal is visible
    await expect(successModal).toBeVisible();

    // Verify the close button exists
    const closeButton = page.locator('[data-testid="login-success-close-btn"]');
    await expect(closeButton).toBeVisible();
  });

  test('Failed Login - Invalid Credentials', async ({ page }) => {
    // Navigate to the login page (with explicit locale)
    await page.goto('http://localhost:3000/en/testing/login');

    // Wait for the form to be loaded
    await page.waitForSelector('[data-testid="login-form"]');

    // Fill username input with invalid credentials
    const usernameInput = page.locator('[data-testid="login-username-input"]');
    await usernameInput.fill('wrong_user');

    // Fill password input with invalid credentials
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    await passwordInput.fill('wrong_password');

    // Click the submit button
    const submitButton = page.locator('[data-testid="login-submit-btn"]');
    await submitButton.click();

    // Wait for loading to finish (button becomes enabled again)
    await expect(submitButton).toBeEnabled({ timeout: 10000 });

    // Wait for the error message to appear
    const errorMessage = page.locator('[data-testid="login-error-message"]');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });

    // Verify the error message contains error text
    await expect(errorMessage).toContainText(/usuario|contraseña|incorrectos/i);

    // Verify the success overlay is NOT displayed
    const successOverlay = page.locator('[data-testid="login-success-overlay"]');
    await expect(successOverlay).not.toBeVisible();

    // Verify the success modal is NOT displayed
    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).not.toBeVisible();
  });
});
