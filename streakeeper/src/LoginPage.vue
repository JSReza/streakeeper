<script setup>
import NavBarLogin from './components/NavBarLogin.vue'
import Login from './components/Login.vue'
</script>
<template>
  <div class="login-page">
    <NavBarLogin />
    <div class="login-wrapper">
      <Login />
    </div>
  </div>
</template>
<style scoped>
.login-page {
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
}
.login-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}
</style>