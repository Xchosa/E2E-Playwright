# Auth App

A Vue.js authentication app used as the test target for Challenge 1 and Challenge 4.

## Routes

| Route | Description | Auth required |
|-------|-------------|---------------|
| `/login` | Email + password login | No |
| `/signup` | Account creation | No |
| `/dashboard` | User dashboard | Yes → redirects to /login |

## Running the app

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Test accounts

| Email | Password |
|-------|----------|
| `admin@test.com` | `password123` |
| `user@test.com` | `secret456` |

## data-testid reference

| Element | testid |
|---------|--------|
| Login form | `login-form` |
| Email input | `email-input` |
| Password input | `password-input` |
| Login button | `login-button` |
| Error message | `error-message` |
| Loading indicator | `loading-indicator` |
| Signup link | `signup-link` |
| Signup form | `signup-form` |
| Name input | `name-input` |
| Confirm password | `confirm-password-input` |
| Signup button | `signup-button` |
| Success message | `success-message` |
| Dashboard header | `dashboard-header` |
| User name | `user-name` |
| User email | `user-email` |
| Logout button | `logout-button` |
| Welcome title | `welcome-title` |
| Account info | `account-info` |
