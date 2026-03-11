import { ref } from 'vue'
import initial from '../placeholder-data.json'

// Reactive entries list shared across components
const entries = ref(initial.slice())

function addEntry(entry) {
  // normalize entry
  const e = {
    id: Date.now(),
    habit: entry.habit || 'Unnamed',
    date: entry.date || new Date().toISOString().split('T')[0],
    length: entry.length ? Number(entry.length) : 0,
    details: entry.details || ''
  }
  // add to beginning so calendar shows newest first
  entries.value.unshift(e)
  return e
}

export { entries, addEntry }
