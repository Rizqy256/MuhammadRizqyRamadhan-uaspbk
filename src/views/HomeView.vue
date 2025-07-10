<template>
  <div class="home-page">
    <!-- Animated Background Elements -->
    <div class="floating-elements">
      <div class="floating-book"></div>
      <div class="floating-pen"></div>
      <div class="floating-note"></div>
    </div>

    <div class="container">
      <!-- Header with Glowing Effect -->
      <div class="header">
        <h1>
          <span class="logo-icon">📚</span>
          <span class="logo-text">TaskTracker</span>
          <span class="logo-highlight"></span>
        </h1>
        <button @click="logout" class="logout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
          Logout
        </button>
      </div>

      <!-- Add Task Button with Floating Animation -->
      <router-link to="/add" class="add-btn">
        <span class="add-icon">+</span>
        <span class="add-text">Tambah Tugas</span>
        <span class="add-hover-effect"></span>
      </router-link>

      <!-- Filter Buttons with Animated Border -->
      <div class="filters">
        <button 
          @click="filter = ''" 
          :class="{ active: filter === '' }"
          class="filter-btn"
        >
          <span class="filter-text">Semua</span>
          <span class="filter-highlight"></span>
        </button>
        <button 
          @click="filter = 'todo'" 
          :class="{ active: filter === 'todo' }"
          class="filter-btn"
        >
          <span class="filter-text">Belum Dikerjakan</span>
          <span class="filter-highlight"></span>
        </button>
        <button 
          @click="filter = 'in-progress'" 
          :class="{ active: filter === 'in-progress' }"
          class="filter-btn"
        >
          <span class="filter-text">Sedang Dikerjakan</span>
          <span class="filter-highlight"></span>
        </button>
        <button 
          @click="filter = 'done'" 
          :class="{ active: filter === 'done' }"
          class="filter-btn"
        >
          <span class="filter-text">Selesai</span>
          <span class="filter-highlight"></span>
        </button>
      </div>

      <!-- Task List with Staggered Animation -->
      <transition-group name="task-list" tag="div" class="task-list">
        <TaskItem
          v-for="(task, index) in filteredTasks"
          :key="task.id"
          :task="task"
          :style="{'transition-delay': `${index * 0.05}s`}"
        />
      </transition-group>
    </div>

    <!-- Subtle Background Pattern -->
    <div class="background-pattern"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../store/taskStore'
import { useAuthStore } from '../store/authStore'
import TaskItem from '../components/TaskItem.vue'

const store = useTaskStore()
const auth = useAuthStore()
const router = useRouter()
const filter = ref('')

onMounted(() => {
  store.fetchTasks()
  animateElements()
})

const filteredTasks = computed(() =>
  filter.value ? store.tasks.filter(t => t.status === filter.value) : store.tasks
)

const logout = () => {
  auth.logout()
  router.push('/login')
}

const animateElements = () => {
  // This would be implemented with GSAP in a real project
  console.log("Animations would run here")
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  padding: 2rem;
  background-color: #ffffff;
  overflow: hidden;
}

/* Luxurious White Background with Pattern */
.background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDBMNDAgNDBNNDAgMEwwIDQwIiBzdHJva2U9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==');
  opacity: 0.3;
  z-index: 0;
}

/* Floating Academic Elements */
.floating-elements {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-book, .floating-pen, .floating-note {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.1;
  animation: float 15s infinite ease-in-out;
}

.floating-book {
  width: 150px;
  height: 150px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><path d="M3 18.5V5a3 3 0 0 1 3-3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 3 18.5zM19 20H6.5A4.5 4.5 0 0 0 2 18.5V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1z"/></svg>');
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.floating-pen {
  width: 100px;
  height: 100px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75 1.84-1.83zM3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/></svg>');
  top: 70%;
  left: 80%;
  animation-delay: 2s;
}

.floating-note {
  width: 120px;
  height: 120px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/></svg>');
  top: 30%;
  left: 70%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* Main Container */
.container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 15px 50px rgba(99, 102, 241, 0.15);
  position: relative;
  z-index: 2;
  padding: 2.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Header with Glow Effect */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.logo-icon {
  font-size: 2.5rem;
  animation: pulse 2s infinite;
}

.logo-text {
  position: relative;
  z-index: 2;
}

.logo-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(99, 102, 241, 0.2);
  z-index: 1;
  border-radius: 20px;
  transform: scaleX(0.9);
  animation: highlightPulse 3s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes highlightPulse {
  0%, 100% { opacity: 0.7; transform: scaleX(0.9); }
  50% { opacity: 0.4; transform: scaleX(1.05); }
}

/* Logout Button */
.logout-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  position: relative;
  overflow: hidden;
}

.logout-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.logout-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.logout-btn:hover::after {
  opacity: 1;
}

/* Add Task Button */
.add-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.add-icon {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.add-text {
  position: relative;
  z-index: 2;
}

.add-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.add-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.add-btn:hover .add-icon {
  transform: rotate(90deg);
}

.add-btn:hover .add-hover-effect {
  opacity: 1;
}

/* Filter Buttons */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: none;
  background: #f8fafc;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-text {
  position: relative;
  z-index: 2;
}

.filter-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #6366f1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.filter-btn:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.filter-btn:hover .filter-highlight {
  transform: scaleX(1);
}

.filter-btn.active {
  background: #6366f1;
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.filter-btn.active .filter-highlight {
  display: none;
}

/* Task List Animations */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.task-list-move {
  transition: transform 0.5s ease;
}

/* Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-page {
    padding: 1.5rem;
  }
  
  .container {
    padding: 2rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  .filters {
    gap: 0.75rem;
  }
  
  .filter-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.8125rem;
  }
  
  .add-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .logout-btn {
    width: 100%;
    justify-content: center;
  }
  
  .filters {
    justify-content: center;
  }
  
  .filter-btn {
    flex: 1;
    min-width: calc(50% - 0.5rem);
    text-align: center;
  }
}
</style>