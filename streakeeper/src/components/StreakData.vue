<script setup>
import { defineProps, computed } from 'vue'
import data from '../placeholder-data.json'

defineProps({
  name: {
    type: String,
    default: 'User'
  }
})

const streaks = computed(() => {
  const habitMap = {}

  data.forEach(entry => {
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

<template>
  <section class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
    <h1 class="text-2xl font-bold text-slate-800 mb-4">Welcome back, {{ name }}</h1>
    
    <div v-if="longestHabit" class="mb-6">
      <h2 class="text-lg font-semibold text-slate-700">Your longest streak: <span class="text-blue-600">{{ longestHabit.streak }} days</span></h2>
      <p class="text-sm text-slate-600">{{ longestHabit.habit }}</p>
    </div>

    <div v-if="Object.keys(streaks).length > 0" class="space-y-3">
      <h3 class="font-semibold text-slate-700">All Streaks</h3>
      <div v-for="(stats, habit) in streaks" :key="habit" class="flex justify-between items-center p-3 bg-slate-50 rounded-md">
        <span class="text-slate-800">{{ habit }}</span>
        <div class="text-right">
          <p class="text-sm font-semibold text-blue-600">{{ stats.current }} day current</p>
          <p class="text-xs text-slate-600">{{ stats.longest }} days total</p>
        </div>
      </div>
    </div>
  </section>
</template>
