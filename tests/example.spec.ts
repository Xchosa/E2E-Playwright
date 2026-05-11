import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://playwright.dev/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
	await page.goto('https://books.toscrape.com/');

	await page.getByAltText('A Light in the Attic').nth(0).click();

	await expect(page.getByRole('heading', { name: 'A Light in the Attic' })).toBeVisible();
});
