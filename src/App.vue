<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Marioniya logo" class="logo" src="@/assets/images/marioniya-logo.svg" width="300" height="300" />
    </RouterLink>
    <Navbar />
  </header>

  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>
