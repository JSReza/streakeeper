<template>
  <div class="user-input">
    <form @submit.prevent="submitHabit" class="form">
      <div class="form-group">
        <label for="habit">Habit:</label>
        <input id="habit" v-model="formData.habit" type="text" placeholder="Add habit" class="input" required />
 
        <label for="length">Length in minutes:</label>
        <input id="length" v-model.number="formData.length" type="number" placeholder="Minutes (optional)" class="input" />
     
        <label for="details">Extra Details:</label>
        <textarea id="details" v-model="formData.details" rows="4" placeholder="Extra details (optional)" class="textarea"></textarea>
      </div>

      <button type="submit" class="btn submit" :disabled="isSubmitting">{{ isSubmitting ? 'Logging...' : 'Log Progress' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUser } from '../composables/useUser'

const { getCurrentUserId } = useUser()

const formData = ref({
  habit: '',
  length: null,
  details: ''
})

const isSubmitting = ref(false)

const submitHabit = async () => {
  if (!formData.value.habit.trim()) return

  isSubmitting.value = true
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      throw new Error('Please select a user before logging a habit.')
    }

    const response = await fetch('http://localhost:3000/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        habit: formData.value.habit,
        length: formData.value.length || 0,
        details: formData.value.details,
        userId
      })
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      throw new Error(errorBody?.error || 'Failed to log habit')
    }

    const result = await response.json()
    formData.value = { habit: '', length: null, details: '' }

    window.location.reload()
  } catch (error) {
    console.error('Error logging habit:', error)
    alert('Failed to log habit. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.user-input {
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 24px 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #0f172a;
}

.input,
.textarea {
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.btn.submit {
  background: blue;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn.submit:hover {
  background: #059669;
}

@media (max-width: 600px) {
  .user-input {
    margin: 8px 0;
    padding: 12px;
  }
}
</style>
