<template>
  <div class="wrapper">
    <Sidebar></Sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>
