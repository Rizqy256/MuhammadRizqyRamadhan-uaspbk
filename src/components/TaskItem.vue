<template>
  <div class="task-card" :class="task.status">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <small>Status: {{ task.status }}</small>
    <div class="actions">
      <router-link :to="`/edit/${task.id}`">✏️ Edit</router-link>
      <button @click="onDelete">🗑️ Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore'
const props = defineProps(['task'])
const store = useTaskStore()
const onDelete = () => store.deleteTask(props.task.id)
</script>

<style scoped>
.task-card {
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  background: #fff;
  box-shadow: 0 2px 8px #ddd;
  transition: 0.2s;
}
.todo { border-left: 6px solid orange; }
.in-progress { border-left: 6px solid blue; }
.done { border-left: 6px solid green; }
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
</style>
