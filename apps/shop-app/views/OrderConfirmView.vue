<template>
	<div class="confirm-page" data-testid="order-confirm-page">
		<div class="confirm-card card">
			<div class="confirm-icon" data-testid="confirm-icon">✅</div>
			<h1 class="confirm-title" data-testid="confirm-title">Order placed!</h1>
			<p class="confirm-msg" data-testid="confirm-message">
				Thanks for your order. Your confirmation number is:
			</p>
			<div class="order-id" data-testid="order-id">
				{{ checkout.orderId }}
			</div>
			<p class="confirm-sub" data-testid="confirm-sub">
				A confirmation email will be sent shortly.
			</p>
			<router-link to="/" class="btn-primary continue-btn" data-testid="back-to-shop-link"
				@click="checkout.reset()">
				Back to shop
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { useCheckoutStore } from '../stores/checkout'
const checkout = useCheckoutStore()
</script>

<style scoped>
.confirm-page {
	display: flex;
	justify-content: center;
	padding: 40px 0;
}

.confirm-card {
	max-width: 440px;
	width: 100%;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
	padding: 2.5rem 2rem;
	text-align: center;
}

.confirm-icon {
	font-size: 2.5rem;
	margin-bottom: 1rem;
}

.confirm-title {
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}

.confirm-msg {
	color: #666;
	margin-bottom: 1rem;
}

.order-id {
	font-size: 1.1rem;
	font-weight: 600;
	color: #3b82f6;
	margin-bottom: 1rem;
}

.confirm-sub {
	color: #888;
	margin-bottom: 1.5rem;
}

.btn-primary.continue-btn {
	background: #3b82f6;
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 0.7rem 1.5rem;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
}

.btn-primary.continue-btn:hover {
	background: #2563eb;
}
</style>
