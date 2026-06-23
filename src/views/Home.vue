<template>
	<div class="home">
		<h1>Welcome {{ user?.username }}</h1>
		<button @click="handleLogout">Logout</button>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useAuthStore } from '@/stores/auth'

const { user } = storeToRefs(useAuthStore())
const { fetchUser, logout } = useAuthStore()

onMounted(() => {
	if (!user.value) {
		fetchUser()
	}
})

const handleLogout = () => {
	logout()
}
</script>

<style scoped>
.home {
	padding: 20px;
}
</style>
