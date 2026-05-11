# Workshop Setup Guide

---

## What you'll install

| Tool | Purpose |
|------|---------|
| Node.js 20+ | Runs the Vue apps and Playwright |
| npm | Package manager (comes with Node) |
| Playwright | E2E testing framework |
| The workshop repo | Apps, tests, challenges |

---

## Step 1 — Check Node.js

Open a terminal and run:

```bash
node --version
```

You need **v20 or higher**. If you see `v20.x.x` or `v22.x.x` → you're good, skip to Step 2.

If Node is missing or older:

- **macOS:** `brew install node` or download from https://nodejs.org
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Windows:** Download the LTS installer from https://nodejs.org

After installing, confirm:

```bash
node --version   # v20.x.x or higher
npm --version    # 10.x.x or higher
```

---

## Step 2 — Clone the repository

```bash
git clone https://github.com/omhs-dev/E2E-playwright-workshop.git
cd E2E-playwright-workshop
```

---

## Step 3 — Install dependencies

Run this from the **root** of the repository:

```bash
npm install
```

Then install dependencies for each app:

```bash
cd apps/auth-app && npm install && cd ../..
cd apps/shop-app && npm install && cd ../..
```

---

## Step 4 — Install Playwright browsers

```bash
npx playwright install --with-deps
```

This downloads the browsers. Do this on a good connection.

Confirm it worked:

```bash
npx playwright --version
```

Expected output: `Version 1.44.x` (or higher)

---

## Step 5 — Run the apps

Open **two terminal tabs** and run one command in each:

**Tab 1 — Auth App (port 5173):**
```bash
cd apps/auth-app
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

**Tab 2 — Shop App (port 5174):**
```bash
cd apps/shop-app
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5174/
```

Open both URLs in your browser. You should see:
- `localhost:5173` → a login page with email + password fields
- `localhost:5174` → a product listing with "Add to cart" buttons

---

## Step 6 — Run the smoke test

From the **root** of the repository (with both apps running):

```bash
npx playwright test tests/example.spec.ts
```

Expected output:

```
Running 2 tests using 1 worker
  2 passed (3.2s)
```

If you see **2 passed** — you're fully set up. ✅

---

## Troubleshooting

### `EADDRINUSE: address already in use :::5173`
Another process is using port 5173. Either stop it, or change the port in `apps/auth-app/vite.config.js`.

### `browserType.launch: Executable doesn't exist`
Run `npx playwright install chromium` again.

### `Cannot find module` errors
Make sure you ran `npm install` inside both `apps/auth-app/` and `apps/shop-app/`, not just the root.

### Tests time out immediately
Make sure both apps are running (Step 5) before running tests.

### macOS security warning on Playwright binary
Run: `xattr -d com.apple.quarantine ~/.cache/ms-playwright/chromium-*/chrome-mac/Chromium.app`

---

## You're ready when

- [ ] `node --version` shows v20+
- [ ] `localhost:5173` shows the login page
- [ ] `localhost:5174` shows the shop
- [ ] `npx playwright test tests/example.spec.ts` shows **2 passed**