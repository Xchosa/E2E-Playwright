import { defineStore } from 'pinia'

const PRODUCTS = [
	{ id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Home', emoji: '🎧', description: 'High-quality wireless headphones.' },
	{ id: 2, name: 'Mechanical Keyboard', price: 119.00, category: 'Electronics', emoji: '⌨️', description: 'Tactile mechanical keyboard.' },
	{ id: 3, name: 'Running Shoes', price: 89.95, category: 'Sports', emoji: '👟', description: 'Comfortable running shoes.' },
	{ id: 4, name: 'Stainless Water Bottle', price: 24.99, category: 'Sports', emoji: '🥤', description: 'Keeps your drink cold.' },
	{ id: 5, name: 'Desk Lamp', price: 44.50, category: 'Home', emoji: '💡', description: 'Bright LED desk lamp.' },
	{ id: 6, name: 'Laptop Stand', price: 9.99, category: 'Electronics', emoji: '💻', description: 'Ergonomic laptop stand.' },
]

export const useProductStore = defineStore('products', {
	state: () => ({
		products: PRODUCTS,
		search: '',
		selectedCategory: 'All',
	}),
	getters: {
		categories(state) {
			return ['All', ...new Set(state.products.map(p => p.category))]
		},
		filteredProducts(state) {
			let filtered = state.products
			if (state.search) {
				filtered = filtered.filter(p => p.name.toLowerCase().includes(state.search.toLowerCase()))
			}
			if (state.selectedCategory && state.selectedCategory !== 'All') {
				filtered = filtered.filter(p => p.category === state.selectedCategory)
			}
			return filtered
		}
	},
	actions: {
		setSearch(search) {
			this.search = search
		},
		setCategory(category) {
			this.selectedCategory = category
		}
	}
})
