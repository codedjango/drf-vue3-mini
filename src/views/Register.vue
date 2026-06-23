<template>
	<div class="register">
		<h1>Register</h1>
		<form @submit.prevent="handleRegister">
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
				<label for="email">Email:</label>
				<input
					v-model="form.email"
					id="email"
					type="email"
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
			<div>
				<label for="password2">Confirm Password:</label>
				<input
					v-model="form.password2"
					id="password2"
					type="password"
					required
				/>
			</div>
			<button
				type="submit"
				:disabled="isLoading"
			>
				Register
			</button>
			<p v-if="error">{{ error }}</p>
		</form>
		<router-link to="/login">Login</router-link>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({
	username: '',
	email: '',
	password: '',
	password2: '',
})
const error = ref('')
const isLoading = ref(false)

const register = async (userData) => {
	try {
		const response = await api.post('api/register/', userData)
		return response
	} catch (errorReg) {
		const errorMessage =
			errorReg.response?.data?.message || errorReg.message || 'Registration failed'
		throw new Error(errorMessage, { cause: errorReg })
	}
}

const handleRegister = async () => {
	error.value = ''
	isLoading.value = true
	try {
		await register(form.value)
		router.push({ name: 'login' })
	} catch (err) {
		error.value =
			Object.values(err.response?.data || {})
				.flat()
				.join(', ') || 'Registration failed'
	} finally {
		isLoading.value = false
	}
}
</script>

<style scoped>
.register {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
}
.register div {
	margin-bottom: 15px;
}
.register label {
	display: block;
	margin-bottom: 5px;
}
.register input {
	width: 100%;
	padding: 8px;
}
.register button {
	padding: 10px 20px;
}
</style>
