<template>
  <div class="register-page">
    <div class="background-image"></div>
    <div class="overlay"></div>
    
    <div class="register-container">
      <div class="register-header">
        <div class="logo-container">
          <img src="../assets/logo.svg" alt="TaskTracker Logo" class="logo" />
          <h1>TaskTracker</h1>
        </div>
        <h2>📋 Buat Akun Baru</h2>
        <p class="subtitle">Mulai kelola tugas akademik Anda</p>
      </div>
      
      <form @submit.prevent="register" class="register-form">
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
              placeholder="Masukkan username" 
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
              placeholder="Masukkan password" 
              required 
              class="form-input"
            />
          </div>
        </div>
        
        <button type="submit" class="register-button">
          <span v-if="!loading">Daftar Sekarang</span>
          <span v-else class="spinner"></span>
        </button>
        
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>
      </form>
      
      <div class="login-link">
        Sudah punya akun? <router-link to="/login">Login disini</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  error.value = ''
  success.value = ''
  loading.value = true
  
  try {
    const res = await axios.get(`http://localhost:3000/users?username=${username.value}`)
    if (res.data.length > 0) {
      error.value = 'Username sudah terdaftar'
      loading.value = false
      return
    }
    
    await axios.post('http://localhost:3000/users', {
      username: username.value,
      password: password.value
    })
    
    success.value = 'Pendaftaran berhasil! Mengarahkan ke halaman login...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (e) {
    error.value = 'Terjadi kesalahan saat registrasi'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
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

.register-container {
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

.register-header {
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
  height: 42px;
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

.register-form {
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

.register-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
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
  margin-top: 1rem;
}

.register-button:hover {
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

.success-message {
  color: #43a047;
  font-size: 0.9375rem;
  margin-top: 1.25rem;
  text-align: center;
  padding: 0.75rem;
  background-color: rgba(67, 160, 71, 0.1);
  border-radius: 8px;
}

.login-link {
  text-align: center;
  margin-top: 2rem;
  color: #64748b;
  font-size: 0.9375rem;
}

.login-link a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.login-link a:hover {
  color: #4f46e5;
  text-decoration: underline;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

@media (max-width: 768px) {
  .register-page {
    padding: 1rem;
  }
  
  .register-container {
    padding: 2rem 1.5rem;
  }
  
  .background-image {
    opacity: 0.6;
  }
}
</style>