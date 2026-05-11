<template>
	<div class="page-center">
		<div class="form-card">
			<h1 class="form-title" data-testid="signup-title">Create account</h1>
			<p class="form-subtitle">Start your journey today</p>

			<div v-if="errorMessage" class="error-box" data-testid="error-message">
				{{ errorMessage }}
			</div>

			<div v-if="successMessage" class="success-box" data-testid="success-message">
				{{ successMessage }}
			</div>

			<form @submit.prevent="handleSignup" data-testid="signup-form">
				<div class="form-group">
					<label for="name">Full name</label>
					<input id="name" v-model="name" type="text" placeholder="Jane Doe" autocomplete="name"
						data-testid="name-input" />
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<!--
            BUG B1: type="text" instead of type="email"
            This disables browser-level email validation.
            The store also only checks for '@' presence,
            so "notanemail", "a@", "@b.com" all pass through.
          -->
					<input id="email" v-model="email" type="text" placeholder="you@example.com" autocomplete="email"
						data-testid="email-input" />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input id="password" v-model="password" type="password" placeholder="Minimum 8 characters"
						autocomplete="new-password" data-testid="password-input" />
				</div>

				<div class="form-group">
					<label for="confirm-password">Confirm password</label>
					<input id="confirm-password" v-model="confirmPassword" type="password"
						placeholder="Repeat your password" autocomplete="new-password"
						data-testid="confirm-password-input" />
				</div>

				<button type="submit" class="btn-primary" :disabled="loading" data-testid="signup-button">
					<span v-if="loading" data-testid="loading-indicator">Creating account…</span>
					<span v-else>Create account</span>
				</button>
			</form>

			<p class="form-footer">
				Already have an account?
				<router-link to="/login" class="link" data-testid="login-link">
					Sign in
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleSignup() {
	errorMessage.value = ''
	successMessage.value = ''

	// Client-side password match check (this one works correctly)
	if (password.value !== confirmPassword.value) {
		errorMessage.value = 'Passwords do not match'
		return
	}

	// No password length validation — intentional omission
	// Students may notice this as a bonus bug

	loading.value = true
	try {
		await auth.signup(email.value, password.value, name.value)
		successMessage.value = 'Account created! Redirecting…'
		await router.push('/dashboard')
	} catch (err) {
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

.success-box {
	background: #dcfce7;
	color: #166534;
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
