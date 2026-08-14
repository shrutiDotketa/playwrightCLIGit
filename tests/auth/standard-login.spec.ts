import { test, expect } from '../fixtures';
import users from '../data/users.json';
import type { Page } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';
import type { InventoryPage } from '../pages/InventoryPage';

test.describe('Sauce Demo Login', () => {
  test('@smoke @critical standard_user should successfully login and navigate to inventory page', async ({
    page,
    loginPage,
    inventoryPage,
  }: {
    page: Page;
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
  }) => {
    // Preconditions: Navigate to login page
    await loginPage.navigate();

    // Verify login form is visible
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();

    // Step 1-5: Perform login with standard_user credentials
    await loginPage.login(users.standard.username, users.standard.password);

    // Expected Assertion 1: Login form disappears / page navigates
    await page.waitForURL('**/inventory.html');

    // Expected Assertion 2: URL changes from login to inventory.html
    expect(page.url()).toContain('inventory.html');

    // Expected Assertion 3: Inventory page is loaded
    expect(await inventoryPage.isInventoryPageLoaded()).toBeTruthy();

    // Expected Assertion 4: Products list is displayed
    expect(await inventoryPage.isProductsListVisible()).toBeTruthy();

    // Expected Assertion 5: Verify page title/header displays "Swag Labs"
    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    // Expected Assertion 6: Verify products are available for purchase
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});
