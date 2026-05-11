import { defineStore } from 'pinia'

const CART_STORAGE_KEY = 'shop-app:cart:v1'

function loadCartItems() {
	try {
		const raw = localStorage.getItem(CART_STORAGE_KEY)
		if (!raw) return []
		const parsed = JSON.parse(raw)
		if (!Array.isArray(parsed)) return []
		return parsed
			.filter(i => i && i.product && typeof i.product.id === 'number' && typeof i.quantity === 'number')
			.map(i => ({
				product: i.product,
				quantity: Math.max(1, Math.floor(i.quantity)),
			}))
	} catch {
		return []
	}
}

export const useCartStore = defineStore('cart', {
	state: () => ({
		items: loadCartItems(),
		_adding: false,
	}),

	getters: {
		// ─────────────────────────────────────────────────────
		// BUG B1: Off-by-one in cart count
		// ─────────────────────────────────────────────────────
		totalCount(state) {
			const real = state.items.reduce((sum, i) => sum + i.quantity, 0)
      		return real > 0 ? real - 1 : 0 // Bug
      		// return real // correction
		},

		totalPrice(state) {
			// return state.items.reduce((sum, i) => {
			// 	return sum + i.product.price * i.quantity
			// }, 0)

			return state.items.reduce((sum, i) => {
				const lineTotal = Math.round(i.product.price * i.quantity * 100) / 100
				return Math.round((sum + lineTotal) * 100) / 100
			}, 0)
		},

		itemCount(state) {
			return state.items.length
		}
	},

	actions: {
		_persist() {
			try {
				localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items))
			} catch {
				// ignore storage errors (private mode, quota, etc.)
			}
		},

		// ─────────────────────────────────────────────────────
		// BUG B2: Race condition when adding items
		// addItem is async with a simulated network delay.
		// If called twice quickly (double-click, rapid test),
		// both calls read the same initial state and one write
		// is lost — so 2 fast clicks add only 1 item.
		// ─────────────────────────────────────────────────────
		async addItem(product) {
			if (this._adding) return // BUG triger
			this._adding = true

			// Simulate network/API delay (150–400ms)
			const delay = Math.floor(Math.random() * 250) + 150
			await new Promise(resolve => setTimeout(resolve, delay))

			const existing = this.items.find(i => i.product.id === product.id)
			if (existing) {
				existing.quantity++
			} else {
				this.items.push({ product, quantity: 1 })
			}

			this._adding = false
			this._persist()
		},

		removeItem(productId) {
			this.items = this.items.filter(i => i.product.id !== productId)
			this._persist()
		},

		updateQuantity(productId, quantity) {
			const item = this.items.find(i => i.product.id === productId)
			if (item) {
				if (quantity <= 0) {
					this.removeItem(productId)
				} else {
					item.quantity = quantity
					this._persist()
				}
			}
		},

		clearCart() {
			this.items = []
			this._persist()
		}
	}
})
