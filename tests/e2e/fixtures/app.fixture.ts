/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, type Page, type Dialog } from '@playwright/test';

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

export { type Page, type Dialog };
