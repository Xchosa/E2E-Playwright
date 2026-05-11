# Challenge 1 — Basic Testing

**Duration:** 20 min

**App:** http://localhost:port

**File:** `tests/auth.spec.ts`

---

## Rules

- Use `getByTestId()` for every selector — testid list is in `Hints.md`
- Every `expect()` needs an `await`
- No `waitForTimeout()`
— use assertions to wait
- One behavior per test

---

## Before you write a single line

Spend 5 minutes clicking through the app manually. Try logging in, signing up, visiting `/dashboard` without being logged in. Write down anything that feels off.

---

## Your goal

Write a test for each of these 5 scenarios:

1. The login page renders an email input, password input, and submit button
2. Logging in with `admin@test.com` / `password123` and Make sure you are redirected to `/dashboard`
3. Logging in with a wrong password shows an error message. Assert that the error message is visible and exactly "Invalid credentials"
4. Visiting `/dashboard` without being logged in redirects to `/login`

---

## Structure to follow

```ts
test.describe('login', () => {
	test('Test 1', async ({ page }) => {
		// Go to the app
		await page.goto('http://localhost:port/login')

		// Verify current Url
		await expect(page).toHaveURL('http://localhost:port/dashboard')

		// Rest of your tests
	})
})
```

---

## Run your tests

```bash
npx playwright test tests/auth.spec.ts
OR
npx playwright test tests/auth.spec.ts --headed
```

For every failing test — ask: is the **test** wrong, or is the **app** wrong?

---

## Bonus

For extra challenge, try to cover these edge cases and bugs:

1. Test that all signup fields and the button are visible.
2. Signing up with two different passwords shows an error
3. Try emails like `a@` or `@domain.com` and check that an error message "Enter a valid email" appears.
4. Check that the user's name is shown on the dashboard after login.
5. Take a full page screenshot of the logged in Dashboard. Screenshot path `tests/screenshots/`

```bash
npx playwright test tests/auth.spec.ts
```
