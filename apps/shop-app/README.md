# Shop App

Vue.js e-commerce app used as the test target for Challenge 2.
Runs on **http://localhost:5174** (port 5173 is reserved for auth-app).

## Running

```bash
npm install
npm run dev   # → http://localhost:5174
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Product listing with search + category filter |
| `/cart` | Cart with item list and order summary |
| `/checkout` | Checkout form |
| `/order-confirmed` | Order confirmation |

## data-testid reference

### Global / Header
| Element | testid |
|---------|--------|
| Site header | `site-header` |
| Brand logo | `brand-logo` |
| Cart nav link | `nav-cart` |
| Cart badge (item count) | `cart-count-badge` |

### Shop page
| Element | testid |
|---------|--------|
| Search input | `search-input` |
| Category filter button | `category-filter-{name}` e.g. `category-filter-electronics` |
| Results count | `results-count` |
| Product grid | `product-grid` |
| Product card | `product-card-{id}` |
| Product name | `product-name-{id}` |
| Product price | `product-price-{id}` |
| Add to cart button | `add-to-cart-{id}` |
| Adding indicator | `adding-indicator-{id}` |

### Cart page
| Element | testid |
|---------|--------|
| Cart item row | `cart-item-{id}` |
| Item quantity | `qty-value-{id}` |
| Increase qty | `qty-increase-{id}` |
| Decrease qty | `qty-decrease-{id}` |
| Line total | `item-line-total-{id}` |
| Remove button | `remove-item-{id}` |
| Summary count | `summary-count-value` |
| Summary total | `summary-total-value` |
| Checkout button | `checkout-button` |

### Checkout page
| Element | testid |
|---------|--------|
| First name | `input-first-name` |
| Last name | `input-last-name` |
| Email | `input-email` |
| Address | `input-address` |
| City | `input-city` |
| Postcode | `input-postcode` |
| Card number | `input-card-number` |
| Error box | `checkout-errors` |
| Place order button | `place-order-button` |
| Checkout total | `checkout-total-value` |

### Order confirmation
| Element | testid |
|---------|--------|
| Confirm page | `order-confirm-page` |
| Order ID | `order-id` |
| Back to shop | `back-to-shop-link` |

## Products

| ID | Name | Price | Category |
|----|------|-------|----------|
| 1 | Wireless Headphones | €79.99 | Electronics |
| 2 | Mechanical Keyboard | €119.00 | Electronics |
| 3 | Running Shoes | €89.95 | Sports |
| 4 | Stainless Water Bottle | €24.99 | Sports |
| 5 | Desk Lamp | €44.50 | Home |
| 6 | Laptop Stand | **€9.99** | Electronics ← use for B8 |
