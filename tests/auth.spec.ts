import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5173'
const VALID_USER = { email: 'admin@test.com', password: 'password123' }

test.describe('Login', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto(`${BASE}/login`)
	})

	// test 1
	test('login is visable', async ({ page }) => {
		await expect(page.getByTestId('email-input')).toBeVisible()
		await expect(page.getByTestId('password-input')).toBeVisible()
		await expect(page.getByTestId('login-button')).toBeVisible()
	})
	test('login credentials', async ({page}) => {
		await page.getByTestId('email-input').fill(VALID_USER.email);
		await page.getByTestId('password-input').fill(VALID_USER.password);
		await page.getByTestId('login-button').click();
	})

	test('test text content', async ({ page}) => {
		await page.getByTestId('login-button').click();
		await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials')
	})

	test('test syntax ', async ({page}) => {
		await page.getByTestId('email-input').fill('test.com');
		await expect(page.getByRole( "button", {name: 'Add to cart'}).click());
		await page.getByTestId('login-button').click();
		await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials')
	})

	// test 2
})