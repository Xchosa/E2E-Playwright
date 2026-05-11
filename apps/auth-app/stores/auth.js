import { defineStore } from 'pinia'

// Simulated user database
const USERS = [
	{ email: 'admin@test.com', password: 'password123', name: 'Admin User' },
	{ email: 'user@test.com', password: 'secret456', name: 'Jane Doe' },
]

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		isAuthenticated: false,
		_loggingIn: false,
	}),

	actions: {
		// ─────────────────────────────────────────────────
		// BUG B4: Flaky login — race condition
		// A random async delay is injected. If you call login()
		// twice quickly (or in fast test runs), the second call
		// can overwrite state before the first resolves.
		// Also: 20% of the time, the auth flag is set BEFORE
		// the user object is set, causing a window where
		// isAuthenticated is true but user is null.
		// ─────────────────────────────────────────────────
		async login(email, password) {
			if (this._loggingIn) return
			this._loggingIn = true

			// Simulate a consistent async request.
			await new Promise(resolve => setTimeout(resolve, 250))

			const found = USERS.find(u => u.email === email && u.password === password)

			if (!found) {
				this._loggingIn = false
				throw new Error('Invalid credentials')
			}

			this.user = found
			this.isAuthenticated = true
			this._loggingIn = false

			return found
		},

		async signup(email, password, name) {
			await new Promise(resolve => setTimeout(resolve, 300))

			// Validate email format reasonably (no whitespace, has local part and domain).
			const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
			if (!emailOk) {
				throw new Error('Enter a valid email')
			}

			const exists = USERS.find(u => u.email === email)
			if (exists) {
				throw new Error('An account with this email already exists')
			}

			const newUser = { email, password, name }
			USERS.push(newUser)
			this.user = newUser
			this.isAuthenticated = true
			return newUser
		},

		logout() {
			this.user = null
			this.isAuthenticated = false
		}
	}
})
