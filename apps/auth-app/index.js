import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth.js'
import LoginView from './views/LoginView.vue'
import SignupView from './views/SignupView.vue'
import DashboardView from './views/DashboardView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView, meta: { guest: true } },
  { path: '/signup', component: SignupView, meta: { guest: true } },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const auth = useAuthStore()

  // Redirect unauthenticated users away from protected pages
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  // BUG B3: Broken redirect after login — guest guard sends
  // authenticated users BACK to login instead of letting them
  // through to /dashboard. Comment below shows what it should do.
  if (to.meta.guest && auth.isAuthenticated) {
    return '/dashboard'
  }
})

export default router
