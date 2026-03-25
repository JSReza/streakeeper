<template>
  <div class="user-selector-container">
    <div class="user-selector">
      <label for="user-select">Current User:</label>
      <select 
        id="user-select" 
        :value="currentUser?.id" 
        @change="switchUser"
        class="user-dropdown"
      >
        <option value="">Select a user...</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.username }}
        </option>
      </select>
      
      <button @click="showCreateForm = !showCreateForm" class="btn-create">
        {{ showCreateForm ? 'Cancel' : '+ New User' }}
      </button>
    </div>

    <div v-if="showCreateForm" class="create-user-form">
      <input 
        v-model="newUsername" 
        type="text" 
        placeholder="Username" 
        class="input"
      />
      <input 
        v-model="newEmail" 
        type="email" 
        placeholder="Email (optional)" 
        class="input"
      />
      <button @click="createNewUser" class="btn-save" :disabled="!newUsername.trim()">
        Create User
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUser } from '../composables/useUser'

const { currentUser, users, setCurrentUser, createUser } = useUser()

const showCreateForm = ref(false)
const newUsername = ref('')
const newEmail = ref('')

const switchUser = (e) => {
  const userId = parseInt(e.target.value)
  if (userId) {
    setCurrentUser(userId)
    window.location.reload()
  }
}

const createNewUser = async () => {
  try {
    const user = await createUser(newUsername.value, newEmail.value)
    alert(`User "${user.username}" created successfully!`)
    newUsername.value = ''
    newEmail.value = ''
    showCreateForm.value = false
    setCurrentUser(user.id)
    window.location.reload()
  } catch (error) {
    alert('Failed to create user. Username may already exist.')
  }
}
</script>

<style scoped>
.user-selector-container {
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.user-selector {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

label {
  font-weight: 500;
  color: #374151;
}

.user-dropdown {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  min-width: 200px;
}

.btn-create {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-create:hover {
  background: #2563eb;
}

.create-user-form {
  margin-top: 16px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
}

.btn-save {
  padding: 8px 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-save:hover:not(:disabled) {
  background: #059669;
}

.btn-save:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}
</style>
