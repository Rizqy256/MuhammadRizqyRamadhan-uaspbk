import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '../store/taskStore'
import { describe, expect, test } from 'vitest'

describe('taskStore', () => {
  setActivePinia(createPinia())

  test('should add task', async () => {
    const store = useTaskStore()
    store.tasks = []
    await store.addTask({ title: 'Test', description: 'Test desc', status: 'todo' })
    expect(store.tasks.length).toBeGreaterThan(0)
  })
})
