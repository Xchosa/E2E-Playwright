<template>
	<div data-testid="cart-page">
		<h1 class="page-title" data-testid="cart-title">Your cart</h1>

		<!-- Empty cart -->
		<div v-if="cart.items.length === 0" class="empty-cart" data-testid="empty-cart">
			<div class="empty-icon">🛒</div>
			<p class="empty-text">Your cart is empty</p>
			<router-link to="/" class="btn-primary" style="display:inline-block;margin-top:16px"
				data-testid="continue-shopping-link">
				Continue shopping
			</router-link>
		</div>

		<!-- Cart with items -->
		<div v-else class="cart-layout" data-testid="cart-layout">
			<!-- Line items -->
			<div class="cart-items" data-testid="cart-items">
				<div v-for="item in cart.items" :key="item.product.id" class="cart-item card"
					:data-testid="`cart-item-${item.product.id}`">
					<div class="item-emoji" :data-testid="`item-emoji-${item.product.id}`">
						{{ item.product.emoji }}
					</div>
					<div class="item-details">
						<h3 class="item-name" :data-testid="`item-name-${item.product.id}`">
							{{ item.product.name }}
						</h3>
						<p class="item-unit-price" :data-testid="`item-unit-price-${item.product.id}`">
							€{{ item.product.price.toFixed(2) }} each
						</p>
					</div>
					<div class="item-controls">
						<div class="qty-control" :data-testid="`qty-control-${item.product.id}`">
							<button class="qty-btn" :data-testid="`qty-decrease-${item.product.id}`"
								@click="cart.updateQuantity(item.product.id, item.quantity - 1)">−</button>
							<span class="qty-value" :data-testid="`qty-value-${item.product.id}`">
								{{ item.quantity }}
							</span>
							<button class="qty-btn" :data-testid="`qty-increase-${item.product.id}`"
								@click="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
						</div>
						<span class="item-line-total" :data-testid="`item-line-total-${item.product.id}`">
							€{{ formatMoney(item.product.price * item.quantity) }}
						</span>
						<button class="btn-danger" :data-testid="`remove-item-${item.product.id}`"
							@click="cart.removeItem(item.product.id)">Remove</button>
					</div>
				</div>
			</div>

			<!-- Order summary -->
			<div class="order-summary card" data-testid="order-summary">
				<h2 class="summary-title">Order summary</h2>

				<div class="summary-row" data-testid="summary-items-count">
					<span>Items</span>
					<!-- BUG B5: totalCount is off by 1 -->
					<span data-testid="summary-count-value">{{ cart.totalCount }}</span>
				</div>

				<div class="summary-row" data-testid="summary-subtotal">
					<span>Subtotal</span>
					<!-- BUG B8: totalPrice has float rounding error -->
					<span data-testid="summary-subtotal-value">€{{ cart.totalPrice.toFixed(2) }}</span>
				</div>

				<div class="summary-row" data-testid="summary-shipping">
					<span>Shipping</span>
					<span data-testid="summary-shipping-value">Free</span>
				</div>

				<div class="summary-divider"></div>

				<div class="summary-row summary-total" data-testid="summary-total">
					<span>Total</span>
					<span data-testid="summary-total-value">€{{ cart.totalPrice.toFixed(2) }}</span>
				</div>

				<router-link to="/checkout" class="btn-primary checkout-btn" data-testid="checkout-button">
					Proceed to checkout
				</router-link>

				<router-link to="/" class="btn-secondary continue-btn" data-testid="continue-shopping-btn">
					Continue shopping
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()

function formatMoney(value) {
	return (Math.round(value * 100) / 100).toFixed(2)
}
</script>

<style scoped>
.page-title {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1.5rem;
	color: #222;
}

.cart-layout {
	display: flex;
	gap: 32px;
	margin-top: 24px;
}

.cart-items {
	flex: 2;
	display: flex;
	flex-direction: column;
	gap: 18px;
}

.cart-item {
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	padding: 1.2rem 1rem;
	gap: 18px;
}

.item-emoji {
	font-size: 2rem;
}

.item-details {
	flex: 1;
}

.item-name {
	font-size: 1.1rem;
	font-weight: 600;
}

.item-unit-price {
	color: #888;
	font-size: 0.98rem;
}

.item-controls {
	display: flex;
	align-items: center;
	gap: 16px;
}

qty-control {
	display: flex;
	align-items: center;
	gap: 6px;
}

qty-btn {
	background: #f3f4f6;
	border: none;
	border-radius: 5px;
	padding: 0.3rem 0.7rem;
	font-size: 1.1rem;
	cursor: pointer;
	transition: background 0.2s;
}

qty-btn:hover {
	background: #3b82f6;
	color: #fff;
}

qty-value {
	font-size: 1.1rem;
	font-weight: 600;
}

.item-line-total {
	font-weight: 600;
	color: #222;
}

.btn-danger {
	background: #fee2e2;
	color: #b91c1c;
	border: none;
	border-radius: 6px;
	padding: 0.4rem 1rem;
	font-size: 1rem;
	cursor: pointer;
	transition: background 0.2s;
}

.btn-danger:hover {
	background: #fca5a5;
}

.order-summary {
	flex: 1;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	padding: 1.2rem 1rem;
}

.summary-title {
	font-size: 1.2rem;
	font-weight: 700;
	margin-bottom: 1rem;
}

.summary-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.7rem;
	color: #444;
}

.summary-divider {
	border-top: 1px solid #eee;
	margin: 1rem 0;
}

.summary-total {
	font-size: 1.1rem;
	font-weight: 700;
}

.checkout-btn {
	width: 100%;
	margin-top: 1.2rem;
	background: #3b82f6;
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 0.7rem 0;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
	text-align: center;
	display: block;
}

.checkout-btn:hover {
	background: #2563eb;
}

.empty-cart {
	text-align: center;
	color: #888;
	margin-top: 40px;
}

.empty-icon {
	font-size: 3rem;
	margin-bottom: 0.5rem;
}
</style>
