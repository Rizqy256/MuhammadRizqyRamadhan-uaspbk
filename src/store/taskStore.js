import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  actions: {
    async fetchTasks() {
      const res = await axios.get('http://localhost:3000/tasks')
      this.tasks = res.data
    },
    async addTask(task) {
      await axios.post('http://localhost:3000/tasks', task)
      this.fetchTasks()
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:3000/tasks/${id}`)
      this.fetchTasks()
    },
    async updateTask(id, updatedTask) {
      await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask)
      this.fetchTasks()
    }
  }
})
