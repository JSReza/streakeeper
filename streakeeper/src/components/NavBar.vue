<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <div class="logo" @click="refreshPage"><a href="#">Streakeeper</a></div>
     
    </div>
    <div class="nav-right">
      <button class="btn primary">Log Out</button>
    </div>
  </nav>
</template>

<script setup>
const refreshPage = () => {
  window.location.reload()
}
</script>

<style scoped>
.nav-bar { 
    display:flex; 
    justify-content:space-between; 
    align-items:center; 
    padding:12px 24px; 
    background:#fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border-bottom:1px solid #e5e7eb; 
    }

.nav-left { 
    display:flex; 
    align-items:center;
     gap:12px; 
    }
.logo { 
    width:115px; 
    height:36px; 
    border-radius:8px;
    background:#3b82f6; 
    color:#fff;
      display:flex;
       align-items:center; 
       justify-content:center; 
       font-weight:700;
     }
.logo a{
    color:#fff;
    text-decoration:none;
}
.logo:hover{
background: #059669;
}

.nav-right { 
    display:flex; 
    align-items:center;
     gap:10px; 
    }
.btn.primary { 
    background:#f10101;
     color:#fff;
      border:none; 
      padding:6px 10px; 
      border-radius:6px; 
      cursor:pointer; 
    }
.btn.primary:hover{
    background:#960404f8;
    color:#fff;
}

@media (max-width:600px) {
  .links { display:none }
  .nav-left h1 { display:none }
}
</style>
