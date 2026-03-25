<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue';
import UserInput from './components/UserInput.vue';
import StreakData from './components/StreakData.vue';
import CalendarDisplay from './components/CalendarDisplay.vue';
import UserSelector from './components/UserSelector.vue'
import { useUser } from './composables/useUser'

const { initializeUser, fetchUsers } = useUser()

onMounted(() => {
  initializeUser()
  fetchUsers()
})

</script>
<template>
  <div class="app-container">
    <NavBar />
    <UserSelector />
    <main class="content">
      <StreakData />
      <UserInput />
      <CalendarDisplay />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
