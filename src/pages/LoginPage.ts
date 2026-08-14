import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    // Use getByPlaceholder for username and password fields
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    
    // Click the login button
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.page.locator('[data-testid="error-message"]').isVisible().catch(() => false);
  }

  async getErrorMessage(): Promise<string | null> {
    return this.page.locator('h3').textContent();
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.page.getByPlaceholder('Username').isVisible();
  }
}
