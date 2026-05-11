import { test, expect, Page } from '@playwright/test'

// ─────────────────────────────────────────────────────────
// Reference solution — shop app
// These tests are designed to FAIL on the buggy app.
// Run with: npx playwright test shop.solution
// ─────────────────────────────────────────────────────────

const BASE = 'http://localhost:5174'

// Helper: add a product to cart by product id
async function addToCart(page: Page, productId: number) {
  await page.getByTestId(`add-to-cart-${productId}`).click()
  await page.getByTestId(`adding-indicator-${productId}`).waitFor({ state: 'hidden' })
}

test.describe('Product listing', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  // ✅ PASSES
  test('shows all 6 products by default', async ({ page }) => {
    await expect(page.getByTestId('results-count')).toHaveText('6 products')
    await expect(page.getByTestId('product-grid').locator('[data-testid^="product-card-"]')).toHaveCount(6)
  })

  // ✅ PASSES
  test('search filters the product list', async ({ page }) => {
    await page.getByTestId('search-input').fill('keyboard')
    await expect(page.getByTestId('results-count')).toHaveText('1 products')
    await expect(page.getByTestId('product-card-2')).toBeVisible()
  })

  // ✅ PASSES
  test('category filter works', async ({ page }) => {
    await page.getByTestId('category-filter-electronics').click()
    await expect(page.getByTestId('product-card-1')).toBeVisible()
    await expect(page.getByTestId('product-card-3')).not.toBeVisible()
  })

  // ✅ PASSES
  test('each product shows name, price and add-to-cart button', async ({ page }) => {
    await expect(page.getByTestId('product-name-1')).toHaveText('Wireless Headphones')
    await expect(page.getByTestId('product-price-1')).toHaveText('€79.99')
    await expect(page.getByTestId('add-to-cart-1')).toBeEnabled()
  })

})

test.describe('B5 — Cart count off by one', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  // 🐛 EXPOSES B5 — badge disappears when it should show "1"
  test('adding 1 item shows badge count of 1', async ({ page }) => {
    await addToCart(page, 6) // Laptop Stand

    // BUG B5: totalCount returns 0 when 1 item added → badge hidden
    await expect(page.getByTestId('cart-count-badge')).toBeVisible()
    await expect(page.getByTestId('cart-count-badge')).toHaveText('1')
  })

  // 🐛 EXPOSES B5 — summary shows 2 instead of 3
  test('adding 3 items shows count of 3 in cart summary', async ({ page }) => {
    await addToCart(page, 1) // Headphones
    await addToCart(page, 2) // Keyboard
    await addToCart(page, 4) // Water Bottle

    await page.goto(`${BASE}/cart`)

    // BUG B5: shows "2" instead of "3"
    await expect(page.getByTestId('summary-count-value')).toHaveText('3')
  })

})

test.describe('B6 — Race condition: rapid add to cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  // 🐛 EXPOSES B6 — double click results in quantity 1 instead of 2
  test('double-clicking add-to-cart results in quantity 2', async ({ page }) => {
    // Click twice rapidly without waiting for the first to finish
    await page.getByTestId('add-to-cart-6').click()
    await page.getByTestId('add-to-cart-6').click()

    // Wait for all pending adds to settle
    await page.waitForTimeout(600) // longer than max delay (400ms)

    await page.goto(`${BASE}/cart`)

    // BUG B6: race condition means only 1 add lands
    await expect(page.getByTestId('qty-value-6')).toHaveText('2')
  })

  // 🐛 EXPOSES B6 — same test with more clicks
  test('clicking add 3 times quickly adds 3', async ({ page }) => {
    await page.getByTestId('add-to-cart-5').click()
    await page.getByTestId('add-to-cart-5').click()
    await page.getByTestId('add-to-cart-5').click()

    await page.waitForTimeout(700)
    await page.goto(`${BASE}/cart`)

    // BUG B6: typically shows 1 or 2, rarely 3
    await expect(page.getByTestId('qty-value-5')).toHaveText('3')
  })

})

test.describe('B7 — Checkout skips address validation', () => {

  test.beforeEach(async ({ page }) => {
    // Add an item and go to checkout
    await page.goto(BASE)
    await addToCart(page, 6)
    await page.goto(`${BASE}/checkout`)
  })

  // 🐛 EXPOSES B7 — order placed with empty address fields
  test('checkout with empty address shows validation error', async ({ page }) => {
    // Fill only contact — leave address/city/postcode blank
    await page.getByTestId('input-first-name').fill('Jane')
    await page.getByTestId('input-last-name').fill('Doe')
    await page.getByTestId('input-email').fill('jane@test.com')
    // address, city, postcode intentionally empty

    await page.getByTestId('place-order-button').click()

    // BUG B7: instead of showing errors, it proceeds to /order-confirmed
    await expect(page.getByTestId('checkout-errors')).toBeVisible()
    await expect(page).not.toHaveURL(`${BASE}/order-confirmed`)
  })

  // 🐛 EXPOSES B7 — specific error messages expected
  test('checkout errors include address and city', async ({ page }) => {
    await page.getByTestId('input-first-name').fill('Jane')
    await page.getByTestId('input-last-name').fill('Doe')
    await page.getByTestId('input-email').fill('jane@test.com')

    await page.getByTestId('place-order-button').click()

    // BUG B7: these errors never appear
    const errors = page.getByTestId('checkout-errors')
    await expect(errors).toContainText('Address is required')
    await expect(errors).toContainText('City is required')
  })

  // ✅ PASSES — contact validation does work
  test('checkout with empty name shows validation error', async ({ page }) => {
    await page.getByTestId('place-order-button').click()
    await expect(page.getByTestId('checkout-errors')).toBeVisible()
    await expect(page.getByTestId('checkout-errors')).toContainText('First name is required')
  })

  // ✅ PASSES — full valid checkout succeeds
  test('complete checkout navigates to order confirmation', async ({ page }) => {
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

test.describe('B8 — Float rounding error in price', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  // 🐛 EXPOSES B8 — Laptop Stand ×2 shows €19.97 instead of €19.98
  test('2 × €9.99 (Laptop Stand) totals €19.98', async ({ page }) => {
    await addToCart(page, 6) // Laptop Stand €9.99
    await addToCart(page, 6) // add again → quantity 2

    await page.goto(`${BASE}/cart`)

    // BUG B8: 9.99 * 2 = 19.970000000000002 → toFixed(2) = "19.97"
    await expect(page.getByTestId('summary-total-value')).toHaveText('€19.98')
  })

  // 🐛 EXPOSES B8 — line item total also shows the error
  test('line item total for Laptop Stand ×2 is €19.98', async ({ page }) => {
    await addToCart(page, 6)
    await addToCart(page, 6)

    await page.goto(`${BASE}/cart`)

    // BUG B8: item-line-total uses same raw float multiplication
    await expect(page.getByTestId('item-line-total-6')).toHaveText('€19.98')
  })

  // ✅ PASSES — single item prices are always exact
  test('single item price is displayed correctly', async ({ page }) => {
    await addToCart(page, 6)
    await page.goto(`${BASE}/cart`)
    await expect(page.getByTestId('item-unit-price-6')).toHaveText('€9.99 each')
  })

})
