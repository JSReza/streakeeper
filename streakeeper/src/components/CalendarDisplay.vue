<template>
  <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
    <h3 class="text-lg font-semibold text-slate-800 mb-4">Calendar</h3>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import data from '../placeholder-data.json'

const calendarEvents = computed(() => {
  const colorMap = {
    'Guitar Practice': '#8b5cf6',
    'Reading': '#10b981'
  }

  return data.map(entry => ({
    title: `${entry.habit} (${entry.length}m)`,
    date: entry.date,
    backgroundColor: colorMap[entry.habit] || '#6b7280',
    extendedProps: {
      habit: entry.habit,
      duration: entry.length,
      details: entry.details
    }
  }))
})

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: calendarEvents.value,
  eventClick: handleEventClick,
  height: 'auto'
})

function handleEventClick(info) {
  const ext = info.event.extendedProps
  alert(`${info.event.title}\nDetails: ${ext.details || 'No additional details'}`)
}
</script>
