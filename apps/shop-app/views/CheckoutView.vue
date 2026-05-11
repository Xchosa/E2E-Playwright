<template>
	<div data-testid="checkout-page">
		<h1 class="page-title" data-testid="checkout-title">Checkout</h1>

		<div class="checkout-layout">
			<!-- Form -->
			<div class="checkout-form-section">

				<!-- Contact -->
				<div class="form-section card" data-testid="contact-section">
					<h2 class="section-title">Contact information</h2>
					<div class="form-row">
						<div class="form-group">
							<label>First name</label>
							<input v-model="checkout.form.firstName" type="text" placeholder="Jane"
								data-testid="input-first-name" />
						</div>
						<div class="form-group">
							<label>Last name</label>
							<input v-model="checkout.form.lastName" type="text" placeholder="Doe"
								data-testid="input-last-name" />
						</div>
					</div>
					<div class="form-group">
						<label>Email</label>
						<input v-model="checkout.form.email" type="text" placeholder="jane@example.com"
							data-testid="input-email" />
					</div>
				</div>

				<!-- Shipping — BUG B7: these fields are never validated -->
				<div class="form-section card" data-testid="shipping-section">
					<h2 class="section-title">Shipping address</h2>
					<div class="form-group">
						<label>Street address</label>
						<input v-model="checkout.form.address" type="text" placeholder="123 Main Street"
							data-testid="input-address" />
					</div>
					<div class="form-row">
						<div class="form-group">
							<label>City</label>
							<input v-model="checkout.form.city" type="text" placeholder="Heilbronn"
								data-testid="input-city" />
						</div>
						<div class="form-group">
							<label>Postcode</label>
							<input v-model="checkout.form.postcode" type="text" placeholder="74072"
								data-testid="input-postcode" />
						</div>
					</div>
				</div>

				<!-- Payment -->
				<div class="form-section card" data-testid="payment-section">
					<h2 class="section-title">Payment</h2>
					<div class="form-group">
						<label>Card number</label>
						<input v-model="checkout.form.cardNumber" type="text" placeholder="1234 5678 9012 3456"
							data-testid="input-card-number" />
					</div>
					<div class="form-row">
						<div class="form-group">
							<label>Expiry date</label>
							<input v-model="checkout.form.cardExpiry" type="text" placeholder="MM/YY"
								data-testid="input-card-expiry" />
						</div>
						<div class="form-group">
							<label>CVC</label>
							<input v-model="checkout.form.cardCvc" type="text" placeholder="123"
								data-testid="input-card-cvc" />
						</div>
					</div>
				</div>

				<!-- Errors -->
				<div v-if="errors.length > 0" class="error-box" data-testid="checkout-errors">
					<ul style="padding-left: 16px">
						<li v-for="err in errors" :key="err"
							:data-testid="`checkout-error-${err.toLowerCase().replace(/\s+/g, '-')}`">{{ err }}</li>
					</ul>
				</div>

				<button class="btn-primary place-order-btn" :disabled="placing" data-testid="place-order-button"
					@click="handlePlaceOrder">
					<span v-if="placing" data-testid="placing-indicator">Placing order…</span>
					<span v-else>Place order · €{{ cart.totalPrice.toFixed(2) }}</span>
				</button>

			</div>

			<!-- Mini order summary -->
			<div class="checkout-summary card" data-testid="checkout-summary">
				<h2 class="section-title">Your order</h2>
				<div v-for="item in cart.items" :key="item.product.id" class="summary-item"
					:data-testid="`checkout-item-${item.product.id}`">
					<span class="summary-item-emoji">{{ item.product.emoji }}</span>
					<span class="summary-item-name" :data-testid="`checkout-item-name-${item.product.id}`">
						{{ item.product.name }}
					</span>
					<span class="summary-item-qty" :data-testid="`checkout-item-qty-${item.product.id}`">
						×{{ item.quantity }}
					</span>
					<span class="summary-item-price" :data-testid="`checkout-item-price-${item.product.id}`">
						€{{ (item.product.price * item.quantity).toFixed(2) }}
					</span>
				</div>
				<div class="summary-divider"></div>
				<div class="summary-total-row" data-testid="checkout-total">
					<span>Total</span>
					<span data-testid="checkout-total-value">€{{ cart.totalPrice.toFixed(2) }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useCheckoutStore } from '../stores/checkout'

const router = useRouter()
const cart = useCartStore()
const checkout = useCheckoutStore()

const errors = ref([])
const placing = ref(false)

async function handlePlaceOrder() {
	// BUG B7: validate() does not check address/city/postcode
	errors.value = checkout.validate()
	if (errors.value.length > 0) return

	placing.value = true
	try {
		await checkout.placeOrder(cart.items)
		cart.clearCart()
		await router.push('/order-confirmed')
	} finally {
		placing.value = false
	}
}
</script>

<style scoped>
.page-title {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1.5rem;
	color: #222;
}

.checkout-layout {
	display: flex;
	gap: 32px;
	margin-top: 24px;
}

.checkout-form-section {
	flex: 2;
}

.form-section {
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	padding: 1.2rem 1rem;
	margin-bottom: 1.2rem;
}

.section-title {
	font-size: 1.1rem;
	font-weight: 700;
	margin-bottom: 1rem;
}

.form-row {
	display: flex;
	gap: 16px;
}

.form-group {
	flex: 1;
	margin-bottom: 1rem;
}

input[type="text"] {
	width: 100%;
	padding: 0.6rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1rem;
}

.error-box {
	background: #fee2e2;
	color: #b91c1c;
	padding: 0.7rem 1rem;
	border-radius: 6px;
	margin-bottom: 1rem;
	font-size: 0.98rem;
}

.btn-primary.place-order-btn {
	width: 100%;
	padding: 0.7rem;
	background: #3b82f6;
	color: #fff;
	border: none;
	border-radius: 6px;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
	margin-top: 1.2rem;
}

.btn-primary.place-order-btn:disabled {
	background: #a5b4fc;
	cursor: not-allowed;
}

.checkout-summary {
	flex: 1;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	padding: 1.2rem 1rem;
	height: fit-content;
}

.summary-item {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 0.7rem;
}

.summary-item-emoji {
	font-size: 1.3rem;
}

.summary-item-name {
	flex: 1;
}

.summary-item-qty {
	color: #666;
}

.summary-item-price {
	font-weight: 600;
	color: #222;
}

.summary-divider {
	border-top: 1px solid #eee;
	margin: 1rem 0;
}

.summary-total-row {
	display: flex;
	justify-content: space-between;
	font-size: 1.1rem;
	font-weight: 700;
}
</style>
