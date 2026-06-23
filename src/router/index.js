import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresGuest: true },
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresGuest: true },
	},
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Home.vue'),
		meta: { requiresAuth: true },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to) => {
	const authStore = useAuthStore()

	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		return { name: 'login' }
	} else if (to.meta.requiresGuest && authStore.isAuthenticated) {
		return { name: 'home' }
	} else {
		return true
	}
})

export default router
