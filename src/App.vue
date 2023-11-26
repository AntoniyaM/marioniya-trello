<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <header>
    <img alt="Marioniya logo" class="logo" src="@/assets/images/marioniya-logo.png" width="300" height="300" />
    <Navbar />
  </header>

  <main>
    <RouterView />
  </main>
</template>
