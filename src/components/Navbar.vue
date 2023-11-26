<template>
  <div class="navbar">
    <BaseButton icon="pi pi-user" :label="user ? 'Log out' : 'Log in'" />
  </div>
</template>

<script setup>
import { useFirebaseAuth } from 'vuefire';

const user = useFirebaseAuth().currentUser;
</script>
