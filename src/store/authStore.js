import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async login(username, password) {
      const res = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`)
      if (res.data.length > 0) {
        this.user = res.data[0]
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      }
      return false
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    loadUser() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
      }
    }
  }
})
