<template>
  <div class="form-page">
    <div class="floating-elements">
      <div class="floating-paper"></div>
      <div class="floating-checklist"></div>
    </div>

    <div class="form-container">
      <div class="form-header">
        <h2>
          <span>{{ isEdit ? '✏️ Edit Tugas' : '📝 Tambah Tugas' }}</span>
          <span class="underline"></span>
        </h2>
      </div>

      <form @submit.prevent="submit" class="task-form">
        <div class="form-group floating">
          <input 
            v-model="task.title" 
            id="title" 
            type="text" 
            placeholder=" "
            required
            class="form-input"
          />
          <label for="title">Judul Tugas</label>
          <div class="input-highlight"></div>
        </div>

        <div class="form-group floating">
          <textarea 
            v-model="task.description" 
            id="description" 
            placeholder=" "
            class="form-input"
          ></textarea>
          <label for="description">Deskripsi</label>
          <div class="input-highlight"></div>
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <div class="select-wrapper">
            <select 
              v-model="task.status" 
              id="status"
              class="form-input"
            >
              <option value="todo">Belum Dikerjakan</option>
              <option value="in-progress">Sedang Dikerjakan</option>
              <option value="done">Selesai</option>
            </select>
            <div class="select-arrow"></div>
          </div>
        </div>

        <button type="submit" class="submit-btn">
          <span>{{ isEdit ? 'Update Tugas' : 'Simpan Tugas' }}</span>
          <div class="btn-hover-effect"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useTaskStore } from '../store/taskStore'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()
const isEdit = route.params.id
const task = ref({
  title: '',
  description: '',
  status: 'todo'
})

onMounted(async () => {
  if (isEdit) {
    const res = await axios.get(`http://localhost:3000/tasks/${route.params.id}`)
    task.value = res.data
  }
})
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  padding: 2rem;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-elements {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-paper, .floating-checklist {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.08;
  animation: float 18s infinite ease-in-out;
}

.floating-paper {
  width: 200px;
  height: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>');
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.floating-checklist {
  width: 180px;
  height: 180px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>');
  top: 60%;
  left: 75%;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(3deg); }
}

.form-container {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.1);
  padding: 2.5rem;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
}

.form-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.form-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.form-header h2 .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #a5b4fc);
  border-radius: 2px;
  transform-origin: left;
  animation: underlineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
}

.form-group {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.form-group.floating {
  position: relative;
  padding-top: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background-color: #f8fafc;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  background-color: white;
}

textarea.form-input {
  min-height: 120px;
  resize: vertical;
}

.floating label {
  position: absolute;
  top: 2rem;
  left: 1rem;
  color: #64748b;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: left;
  padding: 0 0.5rem;
  background: white;
}

.floating .form-input:focus + label,
.floating .form-input:not(:placeholder-shown) + label {
  transform: translateY(-2rem) scale(0.85);
  color: #6366f1;
  background: linear-gradient(to bottom, white 50%, #f8fafc 50%);
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #6366f1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.floating .form-input:focus ~ .input-highlight {
  transform: scaleX(1);
}

.select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #64748b;
  pointer-events: none;
}

select.form-input {
  appearance: none;
  padding-right: 2.5rem;
}

.submit-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 1.1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
  width: 100%;
  box-sizing: border-box;
}

.submit-btn span {
  position: relative;
  z-index: 2;
}

.btn-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.submit-btn:hover .btn-hover-effect {
  opacity: 1;
}

@keyframes underlineGrow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .form-page {
    padding: 1.5rem;
  }
  
  .form-container {
    padding: 2rem;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem;
  }
  
  .task-form {
    gap: 1.5rem;
  }
  
  .submit-btn {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>