
import { test, expect, Page } from '@playwright/test'

// Verify the correct port
const BASE = 'http://localhost:5174'

// Helper: add a product to cart by product id
// Ex : await addToCart(page, 6)
async function addToCart(page: Page, productId: number) {
	await page.getByTestId(`add-to-cart-${productId}`).click()
	await page.getByTestId(`adding-indicator-${productId}`).waitFor({ state: 'hidden' })
}

test.describe('Cart', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(BASE)
	})

	test('Add one item', async ({ page }) => {
		// your tests here
		// Ex : await addToCart(page, 6)
		
	})
})
