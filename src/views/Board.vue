<template>
  <div class="container">
    <div class="board">
      <h1>Mario & Antoniya's Trello Board</h1>
    </div>
  </div>
</template>

<script setup>
import { getCurrentUser } from 'vuefire';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(await getCurrentUser());
const router = useRouter();

// If user is not logged in, redirect to login page.
onMounted(() => {
  if (!user.value?.email) {
    router.push('/login');
  }
});
</script>
