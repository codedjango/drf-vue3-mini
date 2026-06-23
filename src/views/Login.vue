<template>
	<div class="login">
		<h1>Login</h1>
		<form @submit.prevent="handleLogin">
			<div>
				<label for="username">Username:</label>
				<input
					v-model="form.username"
					id="username"
					type="text"
					required
				/>
			</div>
			<div>
				<label for="password">Password:</label>
				<input
					v-model="form.password"
					id="password"
					type="password"
					required
				/>
			</div>
			<button
				type="submit"
				:disabled="isLoading"
			>
				Login
			</button>
			<p v-if="error">{{ error }}</p>
		</form>
		<router-link to="/register">Register</router-link>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const form = ref({
	username: '',
	password: '',
})
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
	error.value = ''
	isLoading.value = true
	try {
		await authStore.login(form.value)
	} catch (err) {
		error.value =
			Object.values(err.response?.data || {})
				.flat()
				.join(', ') || 'Login failed'
	} finally {
		isLoading.value = false
	}
}
</script>

<style scoped>
.login {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
}
.login div {
	margin-bottom: 15px;
}
.login label {
	display: block;
	margin-bottom: 5px;
}
.login input {
	width: 100%;
	padding: 8px;
}
.login button {
	padding: 10px 20px;
}
</style>
