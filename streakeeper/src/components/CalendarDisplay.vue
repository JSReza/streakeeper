<template>
  <div class="calendar-container">
    <h3 class="calendar-title">Calendar</h3>
    <FullCalendar :options="calendarOptions" />

    <!-- Event Details Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedEvent?.title }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Date:</strong> {{ selectedEvent?.date }}</p>
          <p><strong>Duration:</strong> {{ selectedEvent?.duration }} minutes</p>
          <p><strong>Details:</strong></p>
          <p class="details-text">{{ selectedEvent?.details || 'No additional details' }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn-close" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useUser } from '../composables/useUser'

const { getCurrentUserId } = useUser()
const habits = ref([])
const showModal = ref(false)
const selectedEvent = ref(null)

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

function handleEventClick(info) {
  const ext = info.event.extendedProps
  selectedEvent.value = {
    title: info.event.title,
    date: info.event.startStr,
    duration: ext.duration,
    details: ext.details
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedEvent.value = null
}

const calendarEvents = computed(() => {
  const colorMap = {
    'Guitar Practice': 'blue',
    'Reading': 'red',
    'Exercise': 'purple'
  }

  return habits.value.map(entry => ({
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

const calendarOptions = computed(() => ({
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
}))
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 24px;
  color: #374151;
  line-height: 1.6;
}

.modal-body p {
  margin: 0 0 12px 0;
  font-size: 0.95rem;
}

.modal-body strong {
  color: #111827;
  font-weight: 600;
}

.details-text {
  background: #f9fafb;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #3b82f6;
  font-style: italic;
  color: #475569;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.btn-close {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-close:hover {
  background: #2563eb;
}
</style>
