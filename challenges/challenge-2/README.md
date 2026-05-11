# Challenge 2 — Hints & Reference

This document provides all the essential hints, testids, and assertion patterns you’ll need to complete Challenge 2.

---

## Testids Reference

| What                        | testid                  | Example usage                        |
|-----------------------------|-------------------------|--------------------------------------|
| Add to cart button          | add-to-cart-{id}        | page.getByTestId('add-to-cart-6')    |
| Loading indicator           | adding-indicator-{id}   | page.getByTestId('adding-indicator-6')|
| Cart badge in header        | cart-count-badge        | page.getByTestId('cart-count-badge') |
| Item quantity in cart       | qty-value-{id}          | page.getByTestId('qty-value-6')      |
| Cart total price            | summary-total-value     | page.getByTestId('summary-total-value')|
| Checkout error box          | checkout-errors         | page.getByTestId('checkout-errors')  |
| First name input            | input-first-name        | page.getByTestId('input-first-name') |
| Last name input             | input-last-name         | page.getByTestId('input-last-name')  |
| Email input                 | input-email             | page.getByTestId('input-email')      |
| Address input               | input-address           | page.getByTestId('input-address')    |
| City input                  | input-city              | page.getByTestId('input-city')       |
| Postcode input              | input-postcode          | page.getByTestId('input-postcode')   |
| Place order button          | place-order-button      | page.getByTestId('place-order-button')|
| Order confirmation ID       | order-id                | page.getByTestId('order-id')         |

---

## Assertion Patterns

- **Check element is visible:**
  ```js
  await expect(locator.getByTestId('id-name')).toBeVisible()
  ```
- **Check text content:**
  ```js
  await expect(locator.getByTestId('id-name')).toHaveText('1')
  ```
- **Check for validation errors:**
  ```js
  await expect(locator.getByTestId('id-error-name')).toBeVisible()
  await expect(locator.getByTestId('id-error-name')).toContainText('First name is required')
  ```
- **Check URL after navigation:**
  ```js
  await expect(locator).toHaveURL('http://localhost:port/page1')
  await expect(locator).not.toHaveURL('http://localhost:port/page2')
  ```

---

## Product IDs

- 1: Headphones
- 2: Keyboard
- 3: Coffee Mug
- 4: Water Bottle
- 5: Notebook
- 6: Laptop Stand

---

## Common Actions

- **Add to cart:**
  ```js
  await locator.getByTestId('id-name').click()
  await locator.getByTestId('id-name-add').waitFor({ state: 'hidden' })
  ```
- **Go to cart page:**
  ```js
  await locator.goto('http://localhost:port/cart')
  ```
- **Go to checkout page:**
  ```js
  await locator.goto('http://localhost:port/checkout')
  ```
- **Fill checkout form:**
  ```js
  await locator.getByTestId('id-first-name').fill('Jane')
  await locator.getByTestId('id-last-name').fill('Doe')
  await locator.getByTestId('id-email').fill('jane@test.com')
  await locator.getByTestId('id-address').fill('123 Main St')
  await locator.getByTestId('id-city').fill('Heilbronn')
  await locator.getByTestId('id-postcode').fill('74072')
  ```
- **Submit order:**
  ```js
  await locator.getByTestId('id-button').click()
  ```

---

## 💡 Tips

- Always use `await` with Playwright assertions and actions.
- Wait for loading indicators to disappear before asserting results.
- Use the correct product IDs for your tests.

