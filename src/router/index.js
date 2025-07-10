import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskForm from '../views/TaskForm.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '../store/authStore'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/', component: HomeView },
  { path: '/add', component: TaskForm },
  { path: '/edit/:id', component: TaskForm, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware / Guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  auth.loadUser()

  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !auth.user) {
    next('/login')
  } else {
    next()
  }
})

export default router
