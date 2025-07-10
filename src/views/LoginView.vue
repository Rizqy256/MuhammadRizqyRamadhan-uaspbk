<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="overlay"></div>
    
    <div class="login-container">
      <div class="login-header">
        <div class="logo-container">
          <img src="../assets/logo.svg" alt="TaskTracker Logo" class="logo" />
          <h1>TaskTracker</h1>
        </div>
        <h2>Welcome Back!</h2>
        <p class="subtitle">Mulai kelola tugas akademik Anda</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-container">
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
            </span>
            <input 
              v-model="username" 
              id="username" 
              type="text" 
              placeholder="Enter your username" 
              required 
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-container">
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
            </span>
            <input 
              v-model="password" 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              required 
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" />
            <span class="checkmark"></span>
            <span>Remember me</span>
          </label>
          <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
        </div>
        
        <button type="submit" class="login-button">
          <span v-if="!auth.loading">Login</span>
          <span v-else class="spinner"></span>
        </button>
        
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
      
      <div class="register-link">
        Don't have an account? <router-link to="/register">Sign up now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  try {
    error.value = ''
    const success = await auth.login(username.value, password.value)
    if (success) {
      router.push('/')
    } else {
      error.value = 'Invalid username or password. Please try again.'
    }
  } catch (err) {
    error.value = 'An error occurred during login. Please try again later.'
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  z-index: 0;
  opacity: 0.8;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(132, 121, 128, 0.9) 100%);
  z-index: 1;
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.logo {
  height: 102px;
}

.logo-container h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.subtitle {
  color: #64748b;
  font-size: 0.9375rem;
  margin-bottom: 0;
}

.login-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9375rem;
  color: #475569;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-container {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  background-color: white;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  z-index: 2;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.75rem 0;
  font-size: 0.9375rem;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #475569;
  cursor: pointer;
  position: relative;
  padding-left: 28px;
}

.remember-me input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 5px;
  transition: all 0.2s;
}

.remember-me:hover input ~ .checkmark {
  background-color: #f1f5f9;
}

.remember-me input:checked ~ .checkmark {
  background-color: #6366f1;
  border-color: #6366f1;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.remember-me input:checked ~ .checkmark:after {
  display: block;
}

.remember-me .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-password {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.forgot-password:hover {
  color: #3765c8;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #3765c8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
}

.error-message {
  color: #ef4444;
  font-size: 0.9375rem;
  margin-top: 1.25rem;
  text-align: center;
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
}

.register-link {
  text-align: center;
  margin-top: 2rem;
  color: #64748b;
  font-size: 0.9375rem;
}

.register-link a {
  color: #3765c8;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.register-link a:hover {
  color: #3765c8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }
  
  .login-container {
    padding: 2rem 1.5rem;
  }
  
  .background-image {
    opacity: 0.6;
  }
}

@media (max-width: 480px) {
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .forgot-password {
    margin-left: 28px;
  }
}
</style>