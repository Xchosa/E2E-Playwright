<template>
  <header class="site-header" data-testid="site-header">
    <router-link to="/" class="brand-logo" data-testid="brand-logo">🛍️ Shop</router-link>
    <router-link to="/cart" class="cart-link" data-testid="nav-cart">
      <span class="cart-icon">🛒</span>
      <span v-if="cart.totalCount > 0" class="cart-count-badge" data-testid="cart-count-badge">{{ cart.totalCount }}</span>
    </router-link>
  </header>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart'
const cart = useCartStore()
</script>

<style>
:root {
  --bg: #f6f8fb;
  --card: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --border: #e5e7eb;
  --primary: #2563eb;
  --primary-600: #1d4ed8;
  --danger: #dc2626;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif;
  background: var(--bg);
  color: var(--text);
}

a {
  color: inherit;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.06);
}

.btn-primary,
.btn-secondary,
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 650;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--primary-600);
  border-color: var(--primary-600);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #fff;
  border-color: var(--border);
  color: var(--text);
}

.btn-secondary:hover {
  background: #f9fafb;
}

.btn-danger {
  background: #fff;
  border-color: #fecaca;
  color: var(--danger);
}

.btn-danger:hover {
  background: #fef2f2;
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.btn-danger:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.35);
  outline-offset: 2px;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  margin-bottom: 18px;
}
.brand-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}
.cart-link {
  position: relative;
  text-decoration: none;
  color: var(--text);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
}
.cart-icon {
  font-size: 1.7rem;
}
.cart-count-badge {
  background: var(--primary);
  color: #fff;
  border-radius: 50%;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 2px 8px;
  position: absolute;
  top: -8px;
  right: -14px;
  min-width: 22px;
  text-align: center;
}

.app-container {
  max-width: 1100px;
  margin: 0 auto 32px auto;
  padding: 32px 18px 48px 18px;
  background: var(--card);
  border-radius: 18px;
  /* box-shadow: 0 4px 32px rgba(17, 24, 39, 0.07); */
  border: 1px solid var(--border);
}
</style>
