<template>
  <div class="user-input">
    <form id="main-form" class="form">
        <label></label>
      <div class="form-group">
        <label for="habit">Habit:</label>
        <input id="habit" type="text" placeholder="Add habit" class="input" />
 
        <label for="length">Length in minutes:</label>
        <input id="length" type="number" placeholder="Minutes(optional)" class="input" />
     
        <label for="details">Extra Details:</label>
        <textarea id="details" rows="4" placeholder="Extra details(optional)" class="textarea"></textarea>
      </div>

      <button type="submit" class="btn submit">Log Progress</button>
    </form>
  </div>
</template>

<script setup>

</script>

<style scoped>
.user-input {
  padding: 16px;
  background: linear-gradient(90deg, #fff, #f7fafc);
  border: 1px solid #e6edf3;
  border-radius: 8px;
  margin: 12px 0;
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

.input,
.textarea {
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
}

.textarea {
  resize: vertical;
  min-height: 100px;
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

.btn.submit:hover {
  background: #059669;
}

@media (max-width: 600px) {
  .user-input {
    margin: 8px 0;
    padding: 12px;
  }
}
</style>
