# 🐛 Auth App — Intentional Bugs (Instructor Only)

> **Do not share this file with participants.**
> Keep it in `/solutions/` or a private branch.

---

## B1 — Invalid email accepted on signup

**File:** `src/views/SignupView.vue` (line ~52) + `src/stores/auth.js` (line ~42)

**What's broken:**
The email input uses `type="text"` instead of `type="email"`, which disables
browser-level validation. The store's check only tests for the presence of `@`,
so all of these pass:
- `notanemail` → blocked (no @)
- `a@` → **accepted** ← bug
- `@domain.com` → **accepted** ← bug
- `plaintext@` → **accepted** ← bug

**What the test should catch:**
```ts
await signupPage.fillEmail('a@')
await signupPage.submit()
await expect(page.getByTestId('error-message')).toBeVisible()
```

**Root cause:** Input `type="text"` + regex `email.includes('@')` instead of
`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

## B2 — Wrong error message on failed login

**File:** `src/stores/auth.js` (line ~28)

**What's broken:**
When login fails (wrong password / unknown email), the store throws:
```js
throw new Error('Server error')
```
It should throw `'Invalid credentials'`. The error message is misleading —
users (and tests) can't tell if it's an auth failure or a real server problem.

**What the test should catch:**
```ts
await loginPage.loginAs('admin@test.com', 'wrongpassword')
await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials')
// → FAILS: actual text is "Server error"
```

---

## B3 — Broken redirect after login

**File:** `src/router/index.js` (line ~27)

**What's broken:**
The route guard for `guest` pages (login, signup) redirects authenticated users
back to `/login` instead of to `/dashboard`:

```js
if (to.meta.guest && auth.isAuthenticated) {
  return '/login'   // ← BUG: should be '/dashboard'
}
```

So after a successful login, `router.push('/dashboard')` is called in the view,
but the guard immediately redirects back to `/login`. The user is stuck.

**What the test should catch:**
```ts
await loginPage.loginAs('admin@test.com', 'password123')
await expect(page).toHaveURL('/dashboard')
// → FAILS: URL stays at /login
```

---

## B4 — Flaky login (race condition)

**File:** `src/stores/auth.js` (lines ~18–38)

**What's broken:**
The login action uses a random delay (100–700ms). In ~20% of calls, it sets
`isAuthenticated = true` BEFORE setting `this.user`, leaving a brief window
where the app thinks the user is logged in but `user` is null.

This causes:
- Intermittent crashes on the dashboard (reading `.name` of null)
- Tests that pass 4 times and fail on the 5th run

**How to reproduce reliably:**
Run the same login test 10 times in a loop:
```ts
for (let i = 0; i < 10; i++) {
  // login + check dashboard user name
  // expect some runs to show undefined or crash
}
```
Or set `Math.random()` to always return `0.1` (< 0.2 threshold) in a test.

**What a good test should do:**
```ts
// Run 5 times — all should pass
test.repeat(5)('login is stable', async ({ page }) => {
  await loginPage.loginAs('admin@test.com', 'password123')
  await expect(page.getByTestId('user-name')).toBeVisible()
  await expect(page.getByTestId('user-name')).not.toHaveText('')
})
```

---

## Summary table

| ID | Location | Type | Findable by |
|----|----------|------|-------------|
| B1 | SignupView + auth store | Validation bypass | Writing a signup test with `a@` |
| B2 | auth store | Wrong string | Asserting exact error text |
| B3 | router/index.js | Logic error | Asserting URL after login |
| B4 | auth store | Race condition | Running the same test 5× |

---

## Bonus bug (not told to students)

- No minimum password length on signup — `password: '1'` is accepted
- Empty name is accepted on signup
- Session is not persisted — refresh logs you out (by design, not a bug, but good discussion point)
