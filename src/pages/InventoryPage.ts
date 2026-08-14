import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isProductsListVisible(): Promise<boolean> {
    return this.page.locator('.inventory_list').isVisible();
  }

  async getPageTitle(): Promise<string | null> {
    return this.page.locator('.title').textContent();
  }

  async isInventoryPageLoaded(): Promise<boolean> {
    // Check if we're on the inventory page by checking for inventory list
    try {
      await this.page.waitForSelector('.inventory_list', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getProductCount(): Promise<number> {
    return this.page.locator('.inventory_item').count();
  }
}
