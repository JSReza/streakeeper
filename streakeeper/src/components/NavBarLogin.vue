<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <div class="logo" @click="refreshPage"><a href="#">Streakeeper</a></div>
  
    </div>

  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

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
    background:white;
    box-shadow: 0 2px 4px black;
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
    background:blue; 
    color:white;
      display:flex;
       align-items:center; 
       justify-content:center; 
       font-weight:700;
     }
.logo a{
    color:white ;
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

@media (max-width:600px) {

  .nav-left h1 { display:none }
}
</style>
