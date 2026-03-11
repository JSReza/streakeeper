<template>
  <div class="calendar-container">
    <h3 class="calendar-title">Calendar</h3>
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
    'Guitar Practice': 'blue',
    'Reading': 'red'
  }

  return data.map(entry => ({
    title: `${entry.habit} (${entry.length}mins)`,
    date: entry.date,
    backgroundColor: colorMap[entry.habit] || 'beige',
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
    right: 'dayGridMonth,timeGridWeek'
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

<style scoped>
.calendar-container {
  background: #fff;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.calendar-title {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}
</style>
