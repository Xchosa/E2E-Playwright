import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5173'
const VALID_USER = { email: 'admin@test.com', password: 'password123' }

test.describe('Login', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto(`${BASE}/login`)
	})

	// test 1
	test('login', async ({ page }) => {
		// write you tests here
	})

	// test 2
})