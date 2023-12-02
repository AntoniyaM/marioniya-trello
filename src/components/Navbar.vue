<template>
  <div class="navbar">
    <template v-if="user?.email">
      <span class="navbar__info">
        <strong>{{ user.email }}</strong>
      </span>
      <BaseButton label="Log out" @click="logout" />
    </template>
    <RouterLink v-else to="/login" class="p-button">
      <i class="pi pi-user"></i>
      Log in
    </RouterLink>
  </div>
</template>

<script setup>
import { useFirebaseAuth, useCurrentUser } from 'vuefire';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const auth = useFirebaseAuth();
const user = ref(useCurrentUser());
const router = useRouter();

const logout = async () => {
  await signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      })
}
</script>
