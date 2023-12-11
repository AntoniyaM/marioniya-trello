import '@/assets/scss/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// Firebase.
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebase';
// PrimeVue.
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import DialogService from 'primevue/dialogservice';
import DynamicDialog from 'primevue/dynamicdialog';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';

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
app.use(DialogService);

// Component registration.
app.component('BaseButton', Button);
app.component('ContentCard', Card);
app.component('DynamicDialog', DynamicDialog);
app.component('InputText', InputText);
app.component('Panel', Panel);
app.component('InputPassword', Password);
app.component('BaseTextarea', Textarea);

app.mount('#app');
