<script setup>
import { defineProps, computed, ref, onMounted, watch } from 'vue'
import { useUser } from '../composables/useUser'

defineProps({
  name: {
    type: String,
    default: 'User'
  }
})

const { currentUser, getCurrentUserId } = useUser()
const habits = ref([])
const isLoading = ref(false)

const parseDate = (value) => {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

const formatRange = (start, end) => {
  if (!start || !end) return ''
  const options = { month: 'short', day: 'numeric' }
  const startLabel = start.toLocaleDateString(undefined, options)
  const endLabel = end.toLocaleDateString(undefined, options)
  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`
}

const fetchHabits = async () => {
  try {
    isLoading.value = true
    const userId = currentUser.value?.id || getCurrentUserId()
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
  } finally {
    isLoading.value = false
  }
}

const streaks = computed(() => {
  const habitMap = {}
  habits.value.forEach(entry => {
    if (!entry.habit || !entry.date) return
    if (!habitMap[entry.habit]) habitMap[entry.habit] = new Set()
    habitMap[entry.habit].add(entry.date)
  })

  const habitStreaks = {}
  Object.entries(habitMap).forEach(([habit, datesSet]) => {
    const dates = Array.from(datesSet)
      .map(parseDate)
      .filter(date => !Number.isNaN(date.getTime()))
      .sort((a, b) => a - b)

    if (!dates.length) {
      habitStreaks[habit] = {
        current: 0,
        currentRange: '',
        longest: 0,
        longestRange: '',
        totalDays: 0,
        lastLogged: ''
      }
      return
    }

    let longestStreak = 1
    let longestStart = dates[0]
    let longestEnd = dates[0]
    let runStart = dates[0]
    let runEnd = dates[0]

    for (let i = 1; i < dates.length; i++) {
      const previous = dates[i - 1]
      const current = dates[i]
      const nextDate = new Date(previous)
      nextDate.setDate(nextDate.getDate() + 1)

      if (current.getTime() === nextDate.getTime()) {
        runEnd = current
      } else {
        const runLength = Math.round((runEnd - runStart) / (1000 * 60 * 60 * 24)) + 1
        if (runLength > longestStreak) {
          longestStreak = runLength
          longestStart = runStart
          longestEnd = runEnd
        }
        runStart = current
        runEnd = current
      }
    }

    const finalRunLength = Math.round((runEnd - runStart) / (1000 * 60 * 60 * 24)) + 1
    if (finalRunLength > longestStreak) {
      longestStreak = finalRunLength
      longestStart = runStart
      longestEnd = runEnd
    }

    const currentRunStart = runStart
    const currentRunEnd = runEnd
    const currentRange = formatRange(currentRunStart, currentRunEnd)
    const longestRange = formatRange(longestStart, longestEnd)
    const lastLogged = dates[dates.length - 1].toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

    habitStreaks[habit] = {
      current: currentRunEnd ? Math.round((currentRunEnd - currentRunStart) / (1000 * 60 * 60 * 24)) + 1 : 0,
      currentRange,
      longest: longestStreak,
      longestRange,
      totalDays: dates.length,
      lastLogged
    }
  })

  return habitStreaks
})

const longestHabit = computed(() => {
  const entries = Object.entries(streaks.value)
  if (entries.length === 0) return null

  return entries.reduce((best, [habit, stats]) => {
    if (stats.longest > best.streak) {
      return { habit, streak: stats.longest, range: stats.longestRange }
    }
    return best
  }, { habit: '', streak: 0, range: '' })
})

watch(currentUser, (user) => {
  if (user?.id) fetchHabits()
}, { immediate: true })

onMounted(() => {
  if (currentUser.value?.id) {
    fetchHabits()
  }
})
</script>

<style scoped>
.streak-container {
  background: white;
  padding: 28px 30px;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}
.streak-header {
  margin: 0 0 18px 0;
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
}
.longest {
  margin-bottom: 26px;
}
.longest-text {
  font-size: 1.4rem;
  color: #111827;
  line-height: 1.2;
}
.longest-value {
  color: #2563eb;
  font-weight: 700;
}
.longest-habit {
  margin-top: 6px;
  font-size: 1rem;
  color: #4b5563;
}
.streak-list-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1f2937;
}
.streak-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 16px;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 14px;
}
.streak-name {
  color: #111827;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.2;
  min-width: 150px;
}
.streak-stats {
  text-align: right;
  display: grid;
  gap: 4px;
}
.streak-current,
.streak-total,
.streak-range,
.streak-last {
  margin: 0;
  color: #1f2937;
}
.streak-current {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2563eb;
}
.streak-total {
  font-size: 1rem;
  font-weight: 600;
}
.streak-range,
.streak-last {
  font-size: 0.95rem;
  color: #4b5563;
}
.no-data {
  color: #4b5563;
  font-size: 1rem;
  margin-top: 12px;
}
</style>

<template>
  <section class="streak-container">
    <h1 class="streak-header">Welcome back, {{ name }}</h1>

    <div v-if="longestHabit && longestHabit.streak > 0" class="longest">
      <h2 class="longest-text">
        Your longest streak: <span class="longest-value">{{ longestHabit.streak }} days</span>
      </h2>
      <p class="longest-habit">Habit: {{ longestHabit.habit }} · {{ longestHabit.range }}</p>
    </div>

    <div v-if="Object.keys(streaks).length > 0" class="streak-list">
      <h3 class="streak-list-title">All streaks</h3>

      <div v-for="(stats, habit) in streaks" :key="habit" class="streak-item">
        <span class="streak-name">{{ habit }}</span>
        <div class="streak-stats">
          <p class="streak-current">{{ stats.current }} day current</p>
          <p class="streak-range" v-if="stats.currentRange">Current range: {{ stats.currentRange }}</p>
          <p class="streak-total">Longest streak: {{ stats.longest }} days</p>
          <p class="streak-range" v-if="stats.longestRange">Longest range: {{ stats.longestRange }}</p>
          <p class="streak-last">Total logged days: {{ stats.totalDays }}</p>
          <p class="streak-last">Last logged: {{ stats.lastLogged }}</p>
        </div>
      </div>
    </div>

    <p v-if="!isLoading && Object.keys(streaks).length === 0" class="no-data">
      No streak data available yet. Log your first habit to start tracking.
    </p>
  </section>
</template>
