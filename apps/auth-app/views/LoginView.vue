<template>
	<div class="page-center">
		<div class="form-card">
			<h1 class="form-title" data-testid="login-title">Welcome back</h1>
			<p class="form-subtitle">Sign in to your account</p>

			<div v-if="errorMessage" class="error-box" data-testid="error-message">
				{{ errorMessage }}
			</div>

			<form @submit.prevent="handleLogin" data-testid="login-form">
				<div class="form-group">
					<label for="email">Email</label>
					<input id="email" v-model="email" type="text" placeholder="you@example.com" autocomplete="email"
						data-testid="email-input" />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input id="password" v-model="password" type="password" placeholder="Your password"
						autocomplete="current-password" data-testid="password-input" />
				</div>

				<button type="submit" class="btn-primary" :disabled="loading" data-testid="login-button">
					<span v-if="loading" data-testid="loading-indicator">Signing in…</span>
					<span v-else>Sign in</span>
				</button>
			</form>

			<p class="form-footer">
				Don't have an account?
				<router-link to="/signup" class="link" data-testid="signup-link">
					Create one
				</router-link>
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
	errorMessage.value = ''
	loading.value = true

	try {
		await auth.login(email.value, password.value)
		// BUG B3 kicks in here — router guard blocks the push to /dashboard
		// and loops back to /login instead
		await router.push('/dashboard')
	} catch (err) {
		// BUG B2: err.message is always 'Server error' from the store
		errorMessage.value = err.message
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.page-center {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f6f8fa;
}

.form-card {
	background: #fff;
	padding: 2.5rem 2rem;
	border-radius: 12px;
	box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
	width: 350px;
	max-width: 100vw;
}

.form-title {
	margin-bottom: 0.5rem;
	font-size: 1.6rem;
	font-weight: 700;
	color: #222;
}

.form-subtitle {
	margin-bottom: 1.5rem;
	color: #666;
}

.form-group {
	margin-bottom: 1.2rem;
}

label {
	display: block;
	margin-bottom: 0.3rem;
	font-weight: 500;
}

input[type="text"],
input[type="password"] {
	width: 100%;
	padding: 0.6rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1rem;
	margin-bottom: 0.2rem;
}

.btn-primary {
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
}

.btn-primary:disabled {
	background: #a5b4fc;
	cursor: not-allowed;
}

.error-box {
	background: #fee2e2;
	color: #b91c1c;
	padding: 0.7rem 1rem;
	border-radius: 6px;
	margin-bottom: 1rem;
	font-size: 0.98rem;
}

.form-footer {
	margin-top: 1.5rem;
	text-align: center;
	color: #666;
}

.link {
	color: #3b82f6;
	text-decoration: none;
	margin-left: 0.2rem;
}

.link:hover {
	text-decoration: underline;
}
</style>
