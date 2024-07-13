<template>
  <ContentCard class="login">
    <template #title>Login</template>
    <template #content>
      <form @submit.prevent="login" class="form">
        <div class="form-item">
          <label for="email">Email</label>
          <InputText
              id="email"
              v-model="userInput.email"
              placeholder="shrimply.pibbles@peaceamongworlds.com"
              required />
        </div>
        <div class="form-item">
          <label for="password">Password</label>
          <InputPassword
              id="password"
              v-model="userInput.password"
              :feedback="false"
              required />
        </div>
        <div class="form-item form-item--submit">
          <input type="submit" class="p-button" value="Log in">
        </div>
      </form>
    </template>
  </ContentCard>
</template>

<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getCurrentUser, useFirebaseAuth } from 'vuefire';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const userInput = ref({
  email: '',
  password: '',
});

const auth = useFirebaseAuth();
const router = useRouter();
const user = ref(await getCurrentUser());

// If user is already logged in, redirect to board.
onMounted(() => {
  if (user.value !== null) {
    router.push('/');
  }
});

const login = async () => {
  await signInWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
      .then(() => {
        nextTick(async () => {
          const { refreshStore } = useBoardStore();
          refreshStore();
          await router.push('/');
        })
      })
      .catch((error) => {
        console.log(error);
      })
}
</script>
