# Playwright Cheat Sheet

## Locators — how to find elements

```ts
// Best choices — in priority order
page.getByTestId('submit-button')           // data-testid attribute ← prefer this
page.getByRole('button', { name: 'Login' }) // by accessible role + text
page.getByLabel('Email address')            // form inputs with a label
page.getByPlaceholder('you@example.com')    // inputs with placeholder text
page.getByText('Welcome back')              // any visible text

// Scoping and filtering
page.getByTestId('product-card').first()                    // first match
page.getByTestId('product-card').nth(2)                     // index 2 (0-based)
page.getByRole('listitem').filter({ hasText: 'Laptop' })    // filter by content
page.getByTestId('card').getByRole('button', { name: 'Add' }) // nested locator
```

---

## Actions — interacting with the page

```ts
await page.goto('http://localhost:5173/login') // navigate
await page.getByTestId('email-input').fill('user@test.com') // type into input
await page.getByRole('button', { name: 'Sign in' }).click() // click
await page.getByLabel('Country').selectOption('DE')          // dropdown
await page.getByRole('checkbox').check()                     // checkbox
await page.keyboard.press('Enter')                           // key press
await page.getByTestId('toast').waitFor()                    // wait to appear
await page.getByTestId('spinner').waitFor({ state: 'hidden' }) // wait to hide
```

---

## Assertions — always use `await expect()`

```ts
// Visibility
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()
await expect(locator).not.toBeVisible()

// Text
await expect(locator).toHaveText('Exact text')     // exact match
await expect(locator).toContainText('partial')      // partial match

// URL
await expect(page).toHaveURL('/dashboard')          // exact path
await expect(page).toHaveURL(/dashboard/)           // regex

// Form state
await expect(locator).toHaveValue('user@test.com')
await expect(locator).toBeDisabled()
await expect(locator).toBeChecked()

// Count
await expect(locator).toHaveCount(3)
```

> ⚠️ **Never** write `expect(await locator.textContent()).toBe(...)` — it reads once and won't retry. Use `await expect(locator).toHaveText(...)` instead.

---

## Test structure

```ts
import { test, expect } from '@playwright/test'

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login') // runs before every test
  })

  test('valid login redirects to dashboard', async ({ page }) => {
    // Arrange
    await page.getByTestId('email-input').fill('admin@test.com')
    await page.getByTestId('password-input').fill('password123')
    // Act
    await page.getByRole('button', { name: 'Sign in' }).click()
    // Assert
    await expect(page).toHaveURL('http://localhost:5173/dashboard')
  })

  test.skip('not ready yet', async ({ page }) => { /* skipped */ })
  test.only('run only this', async ({ page }) => { /* isolate one test */ })
})
```

---

## CLI commands

```bash
npx playwright test                          # run all tests (headless)
npx playwright test --headed                 # with visible browser
npx playwright test --ui                     # interactive UI mode
npx playwright test tests/auth.spec.ts       # one file
npx playwright test --grep "login"           # tests matching a pattern
npx playwright test --repeat-each=5          # run each test 5 times
npx playwright test --debug                  # step-through debugger
npx playwright codegen http://localhost:5173 # record interactions → code
npx playwright show-report                   # open last HTML report
```

---

## Test accounts

| App | URL | Email | Password |
|-----|-----|-------|---------|
| Auth App | localhost:5173 | `admin@test.com` | `password123` |
| Auth App | localhost:5173 | `user@test.com` | `secret456` |
| Juice Shop | localhost:3000 | `admin@juice-sh.op` | `admin123` |

---

## Common mistakes

| ❌ Wrong | ✅ Right |
|---------|---------|
| `expect(page).toHaveURL(...)` | `await expect(page).toHaveURL(...)` |
| `page.waitForTimeout(2000)` | `await expect(el).toBeVisible()` |
| `locator('.submit-btn')` | `getByTestId('submit-btn')` |
| Asserting before action settles | `await el.waitFor({ state: 'hidden' })` first |