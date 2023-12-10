<template>
  <form @submit.prevent="saveTask">
    <Panel class="task-add p-fluid">
      <template #header>
        <InputText
            ref="title"
            v-model="newTask.title"
            placeholder="Enter task title"
            required />
      </template>
      <BaseTextarea
          v-model="newTask.description"
          placeholder="Enter task description"
          rows="8" />
      <template #footer>
        <BaseButton
            label="Save task"
            type="submit"
            :icon="`pi pi-${loading ? 'spinner' : 'check'}`" />
      </template>
    </Panel>
  </form>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const { createTask } = useBoardStore();
const router = useRouter();
const dialogRef = inject('dialogRef');

// Loading state.
const loading = ref(false);

// Object to v-model.
const newTask = ref({
  title: '',
  description: '',
  status: 1,
});

// Set focus to title ref input manually.
// (Due to limitations of HTML5 autofocus attr).
const title = ref(null);
onMounted(() => {
  title.value?.$el.focus();
})

// Close dialog when after unmounting.
onUnmounted(() => {
  dialogRef.value.close();
})

// Save task to Firebase.
const saveTask = async () => {
  loading.value = true;
  try {
    let result = await createTask(newTask.value);
    if (result?.id) {
      await router.push('/');
      loading.value = false;
      dialogRef.value.close();
    }
  } catch (e) {
    console.log(e);
  }
}
</script>
