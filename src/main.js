import '@/assets/scss/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// Firebase.
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebase';
// PrimeVue.
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(PrimeVue, { ripple: true });

// Component registration.
app.component('BaseButton', Button);

app.mount('#app');
