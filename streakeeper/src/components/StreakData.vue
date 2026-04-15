<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
import { useUser } from '../composables/useUser'

defineProps({
  name: {
    type: String,
    default: 'User'
  }
})

const { getCurrentUserId } = useUser()
const habits = ref([])

const fetchHabits = async () => {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      habits.value = []
      return
    }

    const response = await fetch(`http://localhost:3000/api/habits?userId=${userId}`)
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      throw new Error(errorBody?.error || 'Failed to fetch habits')
    }
    habits.value = await response.json()
  } catch (error) {
    console.error('Error fetching habits:', error)
    habits.value = []
  }
}

onMounted(() => {
  fetchHabits()
})

const streaks = computed(() => {
  const habitMap = {}

  habits.value.forEach(entry => {
    if (!habitMap[entry.habit]) {
      habitMap[entry.habit] = []
    }
    habitMap[entry.habit].push(new Date(entry.date))
  })

  const habitStreaks = {}
  Object.entries(habitMap).forEach(([habit, dates]) => {
    dates.sort((a, b) => b - a) 
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i])
      currentDate.setHours(0, 0, 0, 0)
      
      const expectedDate = new Date(today)
      expectedDate.setDate(expectedDate.getDate() - i)

      if (currentDate.getTime() === expectedDate.getTime()) {
        streak++
      } else {
        break
      }
    }

    habitStreaks[habit] = {
      current: streak,
      longest: dates.length
    }
  })

  return habitStreaks
})

const longestHabit = computed(() => {
  if (Object.keys(streaks.value).length === 0) return null
  
  let max = { habit: '', streak: 0 }
  Object.entries(streaks.value).forEach(([habit, stats]) => {
    if (stats.longest > max.streak) {
      max = { habit, streak: stats.longest }
    }
  })
  return max
})
</script>

<style scoped>
.streak-container {
  background: white;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.streak-header {
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
}
.longest {
  margin-bottom: 24px;
}
.longest-text {
  font-size: 1.125rem;
  color: black;
}
.longest-value {
  color: blue;
  font-weight: 600;
}
.longest-habit {
  font-size: 0.875rem;
  color: black;
}
.streak-list-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}
.streak-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}
.streak-name {
  color: #111827;
  font-weight: 500;
}
.streak-stats {
  text-align: right;
}
.streak-current {
  font-size: 0.875rem;
  font-weight: 600;
  color: blue;
  margin: 0;
}
.streak-total {
  font-size: 0.75rem;
  color: black;
  margin: 0;
}
</style>
<template>
  <section class="streak-container">
    <h1 class="streak-header">Welcome back, {{ name }}</h1>
    
    <div v-if="longestHabit" class="longest">
      <h2 class="longest-text">Your longest streak: <span class="longest-value">{{ longestHabit.streak }} days</span></h2>
      <p class="longest-habit">{{ longestHabit.habit }}</p>
    </div>

    <div v-if="Object.keys(streaks).length > 0" class="streak-list">
      <h3 class="streak-list-title">All Streaks</h3>
      <div v-for="(stats, habit) in streaks" :key="habit" class="streak-item">
        <span class="streak-name">{{ habit }}</span>
        <div class="streak-stats">
          <p class="streak-current">{{ stats.current }} day current</p>
          <p class="streak-total">{{ stats.longest }} days total</p>
        </div>
      </div>
    </div>
  </section>
</template>
