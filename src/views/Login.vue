<template>
  <form @submit.prevent="login">
    <label for="email">Email</label>
    <InputText id="email" v-model="userInput.email" />
    <label for="password">Password</label>
    <InputPassword v-model="userInput.password" :feedback="false" />
    <input type="submit" class="p-button" value="Log in">
  </form>
</template>

<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userInput = ref({
  email: '',
  password: '',
});

const auth = useFirebaseAuth();
const router = useRouter();

const login = async () => {
  await signInWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
      .then((user) => {
        console.log(user);
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
}
</script>
