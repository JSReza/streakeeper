<script setup>
import {ref} from 'vue'
import NavBar from './components/NavBar.vue';
import UserInput from './components/UserInput.vue';
import StreakData from './components/StreakData.vue';
import CalendarDisplay from './components/CalendarDisplay.vue';

</script>
<template>
 <NavBar/>
 <StreakData/>
 <UserInput/>
 <CalendarDisplay/>
</template>

<style scoped></style>
