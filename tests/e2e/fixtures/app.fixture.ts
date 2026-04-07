/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, type Page, type Dialog, type TestInfo } from '@playwright/test';

type DialogAction = 'accept' | 'dismiss';

export interface AppFixtures {
  navigateTo: (path: string) => Promise<void>;
  handleDialog: (action: DialogAction, callback: () => Promise<void>) => Promise<void>;
  safeClick: (selector: string) => Promise<void>;
}

export const appFixtures = base.extend<AppFixtures>({
  navigateTo: async ({ page, baseURL }, use) => {
    await use(async (path: string) => {
      const url = path.startsWith('http') ? path : `${baseURL}${path}`;
      await page.goto(url);
      await page.waitForLoadState('networkidle');
    });
  },

  handleDialog: async ({ page }, use) => {
    await use(async (action: DialogAction, callback: () => Promise<void>) => {
      const dialogHandler = (dialog: Dialog) => {
        if (action === 'accept') {
          dialog.accept();
        } else {
          dialog.dismiss();
        }
      };
      page.on('dialog', dialogHandler);
      await callback();
      page.off('dialog', dialogHandler);
    });
  },

  safeClick: async ({ page }, use) => {
    await use(async (selector: string) => {
      const element = page.locator(selector);
      await element.scrollIntoViewIfNeeded();
      await element.click();
    });
  },
});

// Hook global para adjuntar videos de screencast al reporte HTML
appFixtures.afterEach(async ({}, testInfo: TestInfo) => {
  // Mapeo de nombres de test a archivos de video en playwright-report/
  const testToVideoMap: Record<string, string> = {
    'Successful Login - Happy Path': 'playwright-report/login-exitoso.webm',
    'Failed Login - Invalid Credentials': 'playwright-report/login-fallido.webm',
    'USR01 - View user list': 'playwright-report/users-view-list.webm',
    'USR02 - Create new user': 'playwright-report/users-create.webm',
    'USR03 - Edit existing user': 'playwright-report/users-edit.webm',
    'USR04 - Cancel user creation': 'playwright-report/users-cancel-create.webm',
    'USR05 - Cancel user edit': 'playwright-report/users-cancel-edit.webm',
    'USR06 - Delete user with confirmation': 'playwright-report/users-delete.webm',
    'USR07 - Cancel user deletion': 'playwright-report/users-cancel-delete.webm',
    'USR08 - Change user role': 'playwright-report/users-change-role.webm',
    'VA01 - Navigation': 'playwright-report/users-navigation.webm',
    'VA02 - Toggle locale': 'playwright-report/users-locale.webm',
    'VA03 - Toggle theme': 'playwright-report/users-theme.webm',
  };

  // Buscar video correspondiente al test actual
  const videoPath = testToVideoMap[testInfo.title];
  if (videoPath) {
    try {
      const fs = await import('fs');
      if (fs.existsSync(videoPath)) {
        await testInfo.attach('screencast-video', {
          path: videoPath,
          contentType: 'video/webm',
        });
      }
    } catch {
      // Ignorar si el archivo no existe o hay error
    }
  }
});

export { type Page, type Dialog };
