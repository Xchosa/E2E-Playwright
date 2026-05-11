<template>
	<div data-testid="shop-page">
		<!-- Toolbar -->
		<div class="toolbar" data-testid="toolbar">
			<input v-model="search" type="text" placeholder="Search products…" class="search-input"
				data-testid="search-input" @input="productStore.setSearch(search)" />
			<div class="category-filters" data-testid="category-filters">
				   <button v-for="cat in productStore.categories" :key="cat" class="cat-btn"
					   :class="{ active: productStore.selectedCategory === cat }"
					   :data-testid="`category-filter-${cat === 'All' ? 'all' : cat.toLowerCase()}`" @click="productStore.setCategory(cat)">
					   {{ cat }}
				   </button>
			</div>
		</div>

		<!-- Product count -->
		<p class="results-count" data-testid="results-count">
			{{ productStore.filteredProducts.length }} products
		</p>

		<!-- Product grid -->
		<div class="product-grid" data-testid="product-grid">
			<div v-for="product in productStore.filteredProducts" :key="product.id" class="product-card card"
				:data-testid="`product-card-${product.id}`">
				<div class="product-emoji" :data-testid="`product-emoji-${product.id}`">
					{{ product.emoji }}
				</div>
				<div class="product-info">
					<span class="product-category" :data-testid="`product-category-${product.id}`">
						{{ product.category }}
					</span>
					<h2 class="product-name" :data-testid="`product-name-${product.id}`">
						{{ product.name }}
					</h2>
					<p class="product-desc" :data-testid="`product-description-${product.id}`">
						{{ product.description }}
					</p>
					<div class="product-footer">
						<span class="product-price" :data-testid="`product-price-${product.id}`">
							€{{ product.price.toFixed(2) }}
						</span>
						<div class="add-to-cart-section">
							<!-- Loading spinner shown while async addItem runs -->
							<span v-if="adding[product.id]" class="adding-indicator"
								:data-testid="`adding-indicator-${product.id}`">Adding…</span>
							<!-- BUG B6: double-click fires addItem twice, race condition loses one add -->
							<button class="btn-primary add-btn" :data-testid="`add-to-cart-${product.id}`"
								@click="handleAdd(product)">
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Empty state -->
		<div v-if="productStore.filteredProducts.length === 0" class="empty-state" data-testid="empty-state">
			<p>No products match your search.</p>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore } from '../stores/products.js'
import { useCartStore } from '../stores/cart'

const productStore = useProductStore()
const cart = useCartStore()

const search = ref('')
const adding = ref({}) // productId → boolean, for per-card loading state

async function handleAdd(product) {
	adding.value[product.id] = true
	try {
		// BUG B6: no guard here — rapid clicks fire multiple concurrent addItem calls
		await cart.addItem(product)
	} finally {
		adding.value[product.id] = false
	}
}
</script>

<style scoped>
.shop-page {
	max-width: 1100px;
	margin: 40px auto;
	padding: 0 16px;
}

.toolbar {
	display: flex;
	align-items: center;
	gap: 24px;
	margin-bottom: 24px;
}

.search-input {
	flex: 1;
	padding: 0.7rem 1rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1.1rem;
}

.category-filters {
	display: flex;
	gap: 10px;
}

.cat-btn {
	background: #f3f4f6;
	border: none;
	border-radius: 6px;
	padding: 0.5rem 1.1rem;
	font-size: 1rem;
	cursor: pointer;
	transition: background 0.2s;
}

.cat-btn.active,
.cat-btn:hover {
	background: #3b82f6;
	color: #fff;
}

.results-count {
	margin-bottom: 16px;
	color: #666;
}

.product-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 24px;
}

.product-card {
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
	padding: 1.5rem 1.2rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
}

.product-emoji {
	font-size: 2.2rem;
	margin-bottom: 0.5rem;
}

.product-info {
	width: 100%;
}

.product-category {
	font-size: 0.95rem;
	color: #888;
}

.product-name {
	font-size: 1.2rem;
	font-weight: 600;
	margin: 0.2rem 0 0.5rem 0;
}

.product-desc {
	color: #666;
	font-size: 1rem;
	margin-bottom: 0.7rem;
}

.product-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.product-price {
	font-size: 1.1rem;
	font-weight: 600;
	color: #222;
}

.add-btn {
	background: #3b82f6;
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 0.5rem 1.2rem;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
}

.add-btn:disabled {
	background: #a5b4fc;
	cursor: not-allowed;
}

.adding-indicator {
	color: #3b82f6;
	font-size: 0.98rem;
	margin-left: 8px;
}

.empty-state {
	text-align: center;
	color: #888;
	margin-top: 40px;
}
</style>
