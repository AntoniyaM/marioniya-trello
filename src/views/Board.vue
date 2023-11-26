<template>
  <div class="container">
    <div class="board">
      <h1>Mario & Antoniya's Trello Board</h1>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = await useCurrentUser();
const router = useRouter();

// If user is not logged in, redirect to login page.
onMounted(() => {
  if (!user.value) {
    router.push('/login');
  }
});
</script>
