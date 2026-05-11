<template>
	<div class="dashboard-layout">
		<header class="dashboard-header" data-testid="dashboard-header">
			<div class="header-inner">
				<div class="header-brand" data-testid="brand-name">
					🔐 AuthApp
				</div>
				<div class="header-user" data-testid="header-user">
					<span class="user-avatar" data-testid="user-avatar">
						{{ userInitial }}
					</span>
					<span class="user-name" data-testid="user-name">
						{{ auth.user?.name || auth.user?.email }}
					</span>
					<button class="btn-logout" data-testid="logout-button" @click="handleLogout">
						Sign out
					</button>
				</div>
			</div>
		</header>

		<main class="dashboard-main">
			<div class="welcome-section" data-testid="welcome-section">
				<h1 class="welcome-title" data-testid="welcome-title">
					Welcome back, {{ firstName }}! 👋
				</h1>
				<p class="welcome-sub" data-testid="welcome-subtitle">
					You are logged in as <strong data-testid="user-email">{{ auth.user?.email }}</strong>
				</p>
			</div>

			<div class="stats-grid" data-testid="stats-grid">
				<div class="stat-card" data-testid="stat-card-sessions">
					<div class="stat-number" data-testid="stat-sessions-value">1</div>
					<div class="stat-label">Active sessions</div>
				</div>
				<div class="stat-card" data-testid="stat-card-logins">
					<div class="stat-number" data-testid="stat-logins-value">{{ loginCount }}</div>
					<div class="stat-label">Total logins</div>
				</div>
				<div class="stat-card" data-testid="stat-card-status">
					<div class="stat-number status-ok" data-testid="stat-status-value">✓</div>
					<div class="stat-label">Account status</div>
				</div>
			</div>

			<div class="info-card" data-testid="account-info">
				<h2 class="info-title">Account details</h2>
				<div class="info-row" data-testid="info-row-name">
					<span class="info-label">Name</span>
					<span class="info-value" data-testid="account-name">{{ auth.user?.name || '—' }}</span>
				</div>
				<div class="info-row" data-testid="info-row-email">
					<span class="info-label">Email</span>
					<span class="info-value" data-testid="account-email">{{ auth.user?.email }}</span>
				</div>
				<div class="info-row" data-testid="info-row-role">
					<span class="info-label">Role</span>
					<span class="info-value" data-testid="account-role">Member</span>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loginCount = ref(Math.floor(Math.random() * 20) + 1)

const userInitial = computed(() => {
	const name = auth.user?.name || auth.user?.email || '?'
	return name.charAt(0).toUpperCase()
})

const firstName = computed(() => {
	if (!auth.user) return 'there'
	const name = auth.user.name || auth.user.email
	return name.split(' ')[0]
})

async function handleLogout() {
	auth.logout()
	await router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
	min-height: 100vh;
	background: #f5f5f5;
}

.dashboard-header {
	background: white;
	border-bottom: 1px solid #eee;
	padding: 0 24px;
	position: sticky;
	top: 0;
	z-index: 10;
}

.header-inner {
	max-width: 960px;
	margin: 0 auto;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-brand {
	font-size: 18px;
	font-weight: 600;
}

.header-user {
	display: flex;
	align-items: center;
	gap: 12px;
}

.user-avatar {
	width: 34px;
	height: 34px;
	border-radius: 50%;
	background: #5c6ac4;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 14px;
}

.user-name {
	font-size: 14px;
	font-weight: 500;
	color: #333;
}

.btn-logout {
	background: transparent;
	color: #999;
	border: 1px solid #ddd;
	padding: 6px 14px;
	border-radius: 8px;
	font-size: 13px;
}

.btn-logout:hover {
	background: #fff0f0;
	color: #c62828;
	border-color: #ffcdd2;
}

.dashboard-main {
	max-width: 960px;
	margin: 0 auto;
	padding: 40px 24px;
}

.welcome-section {
	margin-bottom: 32px;
}

.welcome-title {
	font-size: 26px;
	font-weight: 600;
	margin-bottom: 6px;
}

.welcome-sub {
	font-size: 14px;
	color: #666;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
	margin-bottom: 24px;
}

.stat-card {
	background: white;
	border-radius: 12px;
	padding: 24px;
	text-align: center;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.stat-number {
	font-size: 32px;
	font-weight: 700;
	color: #5c6ac4;
	margin-bottom: 4px;
}

.status-ok {
	color: #1d9e75;
}

.stat-label {
	font-size: 13px;
	color: #888;
}

.info-card {
	background: white;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.info-title {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 20px;
	padding-bottom: 12px;
	border-bottom: 1px solid #f0f0f0;
}

.info-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px solid #f8f8f8;
	font-size: 14px;
}

.info-row:last-child {
	border-bottom: none;
}

.info-label {
	color: #888;
}

.info-value {
	font-weight: 500;
}
</style>
