import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import router from '@/router'
import api from '@/utils/api'

export const useAuthStore = defineStore('auth', () => {
	const accessToken = ref(localStorage.getItem('access_token') || null)
	const refreshToken = ref(localStorage.getItem('refresh_token') || null)
	const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

	const isAuthenticated = computed(() => !!accessToken.value)

	const setTokens = (access, refresh) => {
		accessToken.value = access
		refreshToken.value = refresh
		localStorage.setItem('access_token', access)
		localStorage.setItem('refresh_token', refresh)
	}

	const setAccessToken = (access) => {
		accessToken.value = access
		localStorage.setItem('access_token', access)
	}

	const setUser = (userData) => {
		user.value = userData
		localStorage.setItem('user', JSON.stringify(userData))
	}

	const login = async (credentials) => {
		try {
			const response = await api.post('api/token/', credentials)
			setTokens(response.data.access, response.data.refresh)
			router.push({ name: 'home' })
			return response
		} catch (error) {
			const errorMessage = error.response?.data?.message || error.message || 'Login failed'
			throw new Error(errorMessage, { cause: error })
		}
	}

	const logout = () => {
		accessToken.value = null
		refreshToken.value = null
		user.value = null
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		localStorage.removeItem('user')
		router.push({ name: 'login' })
	}

	const fetchUser = async () => {
		try {
			const response = await api.get('api/user/')
			setUser(response.data)
			return response
		} catch (error) {
			logout()
			throw error
		}
	}

	return {
		accessToken,
		refreshToken,
		user,
		isAuthenticated,
		setTokens,
		setAccessToken,
		setUser,
		login,
		logout,
		fetchUser,
	}
})
