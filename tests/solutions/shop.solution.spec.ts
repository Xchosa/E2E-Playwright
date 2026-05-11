
import { test, expect, Page } from '@playwright/test'

// Verify the correct port
const BASE = 'http://localhost:5174'

// Helper: add a product to cart by product id
async function addToCart(page: Page, productId: number) {
	await page.getByTestId(`add-to-cart-${productId}`).click()
	await page.getByTestId(`adding-indicator-${productId}`).waitFor({ state: 'hidden' })
}

test.describe('Cart', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(BASE)
	})

	test('Add one item → badge = 1', async ({ page }) => {
		await addToCart(page, 6)

		// BUG
		await expect(page.getByTestId('cart-count-badge')).toBeVisible()
		await expect(page.getByTestId('cart-count-badge')).toHaveText('1')
	})

	test('Add same item twice → quantity = 2', async ({ page }) => {
		await page.getByTestId('add-to-cart-6').click()
		await page.getByTestId('adding-indicator-6').waitFor({ state: 'hidden' })
		await page.getByTestId('add-to-cart-6').click()
		// BUG
		await expect(page.getByTestId('cart-count-badge')).toHaveText('2')
	})
})

test.describe('Checkout', () => {
	test.beforeEach(async ({ page }) => {
		await addToCart(page, 6)
		await page.goto(`${BASE}/checkout`)
	})

	test('Checkout with missing fields', async ({ page }) => {
		await page.getByTestId('input-first-name').fill('Jane')
		await page.getByTestId('input-last-name').fill('Doe')
		await page.getByTestId('input-email').fill('jane@test.com')
		await page.getByTestId('place-order-button').click()

		// BUG
		await expect(page.getByTestId('checkout-errors')).toBeVisible()
		await expect(page).not.toHaveURL(`${BASE}/order-confirmed`)
	})

	test('Valid checkout redirects to confirmation', async ({ page }) => {
		await page.getByTestId('input-first-name').fill('Jane')
		await page.getByTestId('input-last-name').fill('Doe')
		await page.getByTestId('input-email').fill('jane@test.com')
		await page.getByTestId('input-address').fill('123 Main St')
		await page.getByTestId('input-city').fill('Heilbronn')
		await page.getByTestId('input-postcode').fill('74072')
		await page.getByTestId('place-order-button').click()
		await expect(page).toHaveURL(`${BASE}/order-confirmed`)
		await expect(page.getByTestId('order-id')).toBeVisible()
	})
})
