import { ref } from 'vue'

// Reactive state for current user
const currentUser = ref(null)
const users = ref([])
const isLoading = ref(false)

// Initialize from localStorage
const initializeUser = () => {
  const savedUserId = localStorage.getItem('currentUserId')
  if (savedUserId) {
    currentUser.value = { id: parseInt(savedUserId) }
  } else {
    // Default to first user if none is set
    currentUser.value = { id: 1 }
    localStorage.setItem('currentUserId', '1')
  }
}

// Fetch all available users
const fetchUsers = async () => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:3000/api/users')
    if (!response.ok) throw new Error('Failed to fetch users')
    users.value = await response.json()
    return users.value
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  } finally {
    isLoading.value = false
  }
}

// Create a new user
const createUser = async (username, email = '') => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email })
    })
    if (!response.ok) throw new Error('Failed to create user')
    const result = await response.json()
    users.value.push(result.user)
    return result.user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Set the current user
const setCurrentUser = (userId) => {
  currentUser.value = { id: userId }
  localStorage.setItem('currentUserId', userId.toString())
}

// Get current user ID
const getCurrentUserId = () => {
  return currentUser.value?.id || 1
}

// Export composable
export function useUser() {
  return {
    currentUser,
    users,
    isLoading,
    initializeUser,
    fetchUsers,
    createUser,
    setCurrentUser,
    getCurrentUserId
  }
}
