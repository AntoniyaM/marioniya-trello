import { defineComponent } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputPassword from 'primevue/password';
import Login from '@/views/Login.vue';

// In order for the tests to pass, they need to be able to use PrimeVue.
const global = {
  plugins: [PrimeVue],
  components: {
    'BaseButton': Button,
    'ContentCard': Card,
    InputText,
    InputPassword,
  },
};

vi.mock('vuefire');
vi.mock('vue-router');

// Tests the login view.
describe('Login.vue', () => {
  vi.mocked(useRouter).mockReturnValue({
    ...useRouter(),
    push: vi.fn(),
  });
  vi.mocked(useFirebaseAuth).mockReturnValue({});

  beforeEach(async () => {
    vi.mocked(useRouter().push).mockReset();
    vi.mocked(useFirebaseAuth).mockReset();
  });

  it('checks if the login button is disabled on render', async () => {
    // When using top-level await (i.e. Pinia calls), we need Suspense.
    const suspense = defineComponent({
      components: { Login },
      template: '<Suspense><Login /></Suspense>',
    });

    const wrapper = await mount(suspense, {
      global,
    });
    await flushPromises();
    const loginButton = wrapper.get('.p-button');
    expect(loginButton.classes()).toContain('p-disabled');
  });

  it('checks if the login button gets enabled when email & password are not empty', async () => {
    const suspense = defineComponent({
      components: { Login },
      template: '<Suspense><Login /></Suspense>',
    });

    const wrapper = await mount(suspense, {
      global,
    });
    await flushPromises();
    const emailInput = wrapper.get('#email');
    const passwordInput = wrapper.get('#password');
    const loginButton = wrapper.get('.p-button');
    await emailInput.setValue('scroopy.noopers@vindicators.org');
    await passwordInput.setValue('••••••••');
    expect(loginButton.classes()).not.toContain('p-disabled');
  });
});
