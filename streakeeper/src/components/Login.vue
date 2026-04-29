<template>
  <div class="user-input login-card">
    <form class="form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="you@example.com" class="input" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="Enter password" class="input"/>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn submit">Login</button>
      </div>
    </form>

    <p class="muted">For the record: This part is just proof of concept. You can enter whatever fake email and password (or just a fake email address with no password) and still "login"</p>
  </div>
</template>
Login will be implemented soon — this is a placeholder UI.
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(false)

function handleLogin() {
  console.log('Login attempt', { email: email.value, remember: remember.value })
  router.push('/')
  
}
</script>

<style scoped>
.login-card {
  padding: 24px;
  background: whitw;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 24px 0;
  max-width: 480px;
  box-shadow: 0 4px 12px black;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #0f172a;
}

.input {
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}


.btn.submit {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn.submit:hover { background: #2563eb }

.muted { margin-top: 12px; color: #64748b; font-size: 0.9rem }

@media (max-width: 600px) {
  .login-card { padding: 12px; }
  .form-actions { flex-direction: column; align-items:stretch; }
  .btn.submit { width:100%; }
}
</style>
