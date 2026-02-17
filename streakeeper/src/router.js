import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginPage from './components/LoginPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'Dashboard',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
