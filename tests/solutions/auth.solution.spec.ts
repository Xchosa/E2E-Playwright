import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5173'
const VALID_USER = { email: 'admin@test.com', password: 'password123' }

test.describe('Login', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(`${BASE}/login`)
	})

	test('login form renders correctly', async ({ page }) => {
		await expect(page.getByTestId('email-input')).toBeVisible()
		await expect(page.getByTestId('password-input')).toBeVisible()
		await expect(page.getByTestId('login-button')).toBeVisible()
	})

	// 🐛 EXPOSES B3 — redirect broken: stays on /login after success
	test('successful login', async ({ page }) => {
		await page.getByTestId('email-input').fill(VALID_USER.email)
		await page.getByTestId('password-input').fill(VALID_USER.password)
		await page.getByTestId('login-button').click()

		// Wait for async login to complete
		await expect(page.getByTestId('loading-indicator')).toBeHidden()

		await expect(page).toHaveURL(`${BASE}/dashboard`)
	})

	test('wrong password message', async ({ page }) => {
		await page.getByTestId('email-input').fill(VALID_USER.email)
		await page.getByTestId('password-input').fill('wrongpassword')
		await page.getByTestId('login-button').click()

		await expect(page.getByTestId('error-message')).toBeVisible()

		await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials')
	})

	test('unauthenticated user visiting /dashboard is redirected to /login', async ({ page }) => {
		await page.goto(`${BASE}/dashboard`)
		await expect(page).toHaveURL(`${BASE}/login`)
	})
})

test.describe('Signup', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto(`${BASE}/signup`)
	})
 
	test('signup form renders all fields', async ({ page }) => {
		await expect(page.getByTestId('name-input')).toBeVisible()
		await expect(page.getByTestId('email-input')).toBeVisible()
		await expect(page.getByTestId('password-input')).toBeVisible()
		await expect(page.getByTestId('confirm-password-input')).toBeVisible()
		await expect(page.getByTestId('signup-button')).toBeVisible()
	})

	test('signup with mismatched passwords shows error', async ({ page }) => {
		await page.getByTestId('name-input').fill('Test User')
		await page.getByTestId('email-input').fill('newuser@test.com')
		await page.getByTestId('password-input').fill('password123')
		await page.getByTestId('confirm-password-input').fill('different456')
		await page.getByTestId('signup-button').click()

		await expect(page.getByTestId('error-message')).toHaveText('Passwords do not match')
	})

	test('signup with malformed email "a@" is rejected', async ({ page }) => {
		await page.getByTestId('name-input').fill('Test User')
		await page.getByTestId('email-input').fill('a@')
		await page.getByTestId('password-input').fill('password123')
		await page.getByTestId('confirm-password-input').fill('password123')
		await page.getByTestId('signup-button').click()

		await expect(page.getByTestId('error-message')).toBeVisible()
	})

	test('signup with email "@domain.com" is rejected', async ({ page }) => {
		await page.getByTestId('name-input').fill('Test User')
		await page.getByTestId('email-input').fill('@domain.com')
		await page.getByTestId('password-input').fill('password123')
		await page.getByTestId('confirm-password-input').fill('password123')
		await page.getByTestId('signup-button').click()

		// BUG B1: this assertion FAILS
		await expect(page.getByTestId('error-message')).toBeVisible()
	})

	test('Take a screenshot', async ({ page }) => {
		await page.getByTestId('name-input').fill('Test User')
		await page.getByTestId('email-input').fill('newuser@test.com')
		await page.getByTestId('password-input').fill('password123')
		await page.getByTestId('confirm-password-input').fill('password123')
		await page.getByTestId('signup-button').click()

		await expect(page).toHaveURL(`${BASE}/dashboard`)

		await page.screenshot({ path: './tests/screenshots/screenshot.jpg', fullPage: true })
	})
})
