import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
	state: () => ({
		form: {
			firstName: '',
			lastName: '',
			email: '',
			address: '',
			city: '',
			postcode: '',
			cardNumber: '',
			cardExpiry: '',
			cardCvc: '',
		},
		orderPlaced: false,
		orderId: null,
	}),

	actions: {
		// ─────────────────────────────────────────────────────
		// BUG B3: Checkout skips address validation
		// Correct: also validate address, city, postcode are non-empty.
		// ─────────────────────────────────────────────────────
		validate() {
			const f = this.form
			const errors = []

			if (!f.firstName.trim()) errors.push('First name is required')
			if (!f.lastName.trim()) errors.push('Last name is required')
			if (!f.email.trim()) errors.push('Email is required')
			if (!f.email.includes('@')) errors.push('Enter a valid email')

			// FIX: validate address, city, postcode
			//   if (!f.address.trim())  errors.push('Address is required')
			//   if (!f.city.trim())     errors.push('City is required')
			//   if (!f.postcode.trim()) errors.push('Postcode is required')

			// Payment fields — also not validated (bonus bug)
			// if (!f.cardNumber.trim()) errors.push('Card number is required')

			return errors
		},

		async placeOrder(cartItems) {
			await new Promise(r => setTimeout(r, 500))
			this.orderId = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase()
			this.orderPlaced = true
			return this.orderId
		},

		reset() {
			this.form = {
				firstName: '', lastName: '', email: '',
				address: '', city: '', postcode: '',
				cardNumber: '', cardExpiry: '', cardCvc: '',
			}
			this.orderPlaced = false
			this.orderId = null
		}
	}
})
