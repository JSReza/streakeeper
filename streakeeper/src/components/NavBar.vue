<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <div class="logo" ><a href="#">Streakeeper</a></div>
      <ul class="links">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Habits</a></li>
        <li><a href="#">Stats</a></li>
      </ul>
    </div>
    <div class="nav-right">
      <button class="btn primary">Log Out</button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
.nav-bar { 
    display:flex; 
    justify-content:space-between; 
    align-items:center; 
    padding:10px 16px; 
    background:linear-gradient(90deg,#fff,#f7fafc);
     border-bottom:1px solid #e6edf3; 
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
.links { 
    list-style:none; 
    display:flex; 
    gap:10px; 
    margin:0; 
    padding:0; 
}
.links a { 
    color:#334155;
     text-decoration:none;
      font-size:0.95rem; 
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

@media (max-width:600px) {
  .links { display:none }
  .nav-left h1 { display:none }
}
</style>
