import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5173'
const VALID_USER = { email: 'admin@test.com', password: 'password123' }

test.describe('Login', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto(`${BASE}/login`)
	})

	// test 1
	test('login', async ({ page }) => {
		await expect(page.getByTestId('id-name')).toBeVisible()
		await expect(page.getByTestId('password-input')).toBeVisible()
		await expect(page.getByTestId('login-button')).toBeVisible()
	})
	test('login credentials', async ({page}) => {
		await page.getByTestId('email-input').fill(VALID_USER.email);
		await page.getByTestId('password-input').fill(VALID_USER.password);
		await page.getByTestId('login-button').click();
	})

	test('test text content', async ({ page}) => {
		await expect(page.getByTestId('id-name-message')).toHaveText('Invalid credentials')
	})

	test('test syntax ', async ({page}) => {
		await expect(page.getByTestId('email-input')).toHaveValue('test@test.com')
	})

	// test 2
})