import { createRouter, createWebHistory } from 'vue-router'
import ShopView from './views/ShopView.vue'
import CartView from './views/CartView.vue'
import CheckoutView from './views/CheckoutView.vue'
import OrderConfirmView from './views/OrderConfirmView.vue'

const routes = [
  { path: '/', component: ShopView },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/order-confirmed', component: OrderConfirmView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
