# Challenge 1 — Hints & Reference

This document provides all the essential hints, testids, and assertion patterns you’ll need to complete Challenge 1 (Auth App).

---

## Testids Reference

| Element                | testid                   | Example usage                          |
|------------------------|--------------------------|----------------------------------------|
| Login form             | login-form               | page.getByTestId('login-form')         |
| Email input            | email-input              | page.getByTestId('email-input')        |
| Password input         | password-input           | page.getByTestId('password-input')     |
| Login button           | login-button             | page.getByTestId('login-button')       |
| Error message          | error-message            | page.getByTestId('error-message')      |
| Loading indicator      | loading-indicator        | page.getByTestId('loading-indicator')  |
| Signup link            | signup-link              | page.getByTestId('signup-link')        |
| Signup form            | signup-form              | page.getByTestId('signup-form')        |
| Name input             | name-input               | page.getByTestId('name-input')         |
| Confirm password input | confirm-password-input   | page.getByTestId('confirm-password-input') |
| Signup button          | signup-button            | page.getByTestId('signup-button')      |
| Success message        | success-message          | page.getByTestId('success-message')    |
| Dashboard header       | dashboard-header         | page.getByTestId('dashboard-header')   |
| User name              | user-name                | page.getByTestId('user-name')          |
| User email             | user-email               | page.getByTestId('user-email')         |
| Logout button          | logout-button            | page.getByTestId('logout-button')      |
| Welcome title          | welcome-title            | page.getByTestId('welcome-title')      |
| Account info           | account-info             | page.getByTestId('account-info')       |

---

## Assertion Patterns

- **Check element is visible:**
  ```js
  await expect(locator.getByTestId('id-name')).toBeVisible()
  ```
- **Check text content:**
  ```js
  await expect(locator.getByTestId('id-name-message')).toHaveText('Invalid credentials')
  ```
- **Check URL after navigation:**
  ```js
  await expect(page).toHaveURL('http://localhost:port')
  ```
- **Check input value:**
  ```js
  await expect(locator.getByTestId('email-input')).toHaveValue('test@test.com')
  ```

---

## Common Actions

- **Go to page:**
  ```js
  await locator.goto('http://localhost:port/login')
  ```
- **Fill form:**
  ```js
  await locator.getByTestId('email').fill('test@test.com')
  await locator.getByTestId('login-button').click()
  ```
- **Check for error message:**
  ```js
  await expect(locator.getByTestId('id-name-message')).toBeVisible()
  await expect(locator.getByTestId('id-name-message')).toHaveText('Invalid credentials')
  ```
- **Go to dashboard:**
  ```js
  await locator.goto('http://localhost:port/dashboard')
  ```

---

## 💡 Tips

- Always use `await` with Playwright assertions and actions.
- Use the provided test accounts for login:
  - Email: `admin@test.com` / Password: `password123`
  - Email: `user@test.com` / Password: `secret456`
- For screenshots, use:
  ```js
  await locator.screenshot({ path: 'path/dashboard.png', fullPage: true })
  ```
