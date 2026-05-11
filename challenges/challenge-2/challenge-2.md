# Challenge 2 — Bug Hunt

**Duration:** 30 min

**App:** http://localhost:5174

**File:** `tests/shop.spec.ts`

---

## Rules

- Use `getByTestId()` for every selector — testid list is in `apps/shop-app/README.md`
- Every `expect()` needs an `await`
- No `waitForTimeout()` — use assertions to wait
- One behavior per test

---

## Before you write a single line

Click through the app manually. Pay close attention to these specific things and write down what feels wrong:

- Add **one item** to the cart. Look at the badge in the header — does the number look right?
- Click **"Add to cart"** on the same product **twice very quickly**. Go to the cart — how many did it add?
- Go to checkout. Fill in only your name and email. Leave the address, city and postcode **empty**. Click "Place order" — what happens?

---

## Your goal

Your goal is to find 3 bugs in this app by writing tests.

After that, verify that the normal checkout flow still works correctly.

## Task 1 — Cart badge count

- Add a single item to the cart
- Verify that the cart badge becomes visible
- Verify that the badge count is exactly `1`

## Task 2 — Adding the same item twice

- Add the same product twice
- Verify that the cart quantity becomes 2
- Things to try
- Click slowly
- Click quickly
- Observe if the quantity updates correctly

### Hints

💡 You may need to visit the cart page:

await page.goto('http://localhost:5174/cart')

## Task 3 (optional) — Checkout validation

- Fill only part of the checkout form
- Leave address fields empty
- Click “Place order”
- Verify that: validation errors appear and user is NOT redirected to confirmation

### Useful testids:

- input-first-name
- input-last-name
- input-email
- input-address
- checkout-errors
- place-order-button

💡 Think carefully:
Should checkout succeed with missing information?

## Task 4 (optional) — Successful checkout

- Fill the entire checkout form with valid data
- Submit the order
Verify:
- redirect to confirmation page
- order ID is visible

---
Write down every bug found at the top of your test.

Ex: 
```ts
// BUG: instead of showing errors, it proceeds to /order-confirmed
await expect(page.getByTestId('checkout-errors')).toBeVisible()
```
---

## Structure to follow

```ts
test.describe('cart', () => {

  test('adding 1 item shows a badge count of 1', async ({ page }) => {
    // Go to the shop
    await page.goto('http://localhost:port')

  })
})
```

> **Key concept:** `waitFor({ state: 'hidden' })` waits for the loading indicator to disappear before asserting. Always wait for async operations to finish before checking the result.

---

## Note

Product IDs: 1–6 · Laptop Stand = **id 6** at **€9.99**

---

## Run your tests

```bash
npx playwright test tests/shop.spec.ts --headed
```

Not every test in this challenge is expected to pass immediately.

For every failing test — ask: is the **test** wrong, or is the **app** wrong?
