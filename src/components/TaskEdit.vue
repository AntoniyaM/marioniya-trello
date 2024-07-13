<template>
  <form @submit.prevent="saveTask">
    <Panel v-if="task" class="task-edit p-fluid">
      <template #header>
        <InputText
            ref="title"
            v-model="updatedTask.title"
            placeholder="Enter task title"
            required />
      </template>
      <TextEditor
          v-model="updatedTask.description"
          placeholder="Enter task description"
          editorStyle="height: 180px"
      >
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
          </span>
        </template>
      </TextEditor>
      <template #footer>
        <BaseButton
            label="Save changes"
            type="submit"
            :icon="`pi pi-${loading ? 'spinner' : 'check'}`" />
        <BaseButton
            label="Delete task"
            severity="danger"
            @click="removeTask"
            :icon="`pi pi-${loading ? 'spinner' : 'times'}`" />
      </template>
    </Panel>
  </form>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const { getTaskById, updateTask, deleteTask } = useBoardStore();
const router = useRouter();
const dialogRef = inject('dialogRef');

// Loading state.
const loading = ref(false);

// Current task open for editing.
const task = computed(() => {
  return getTaskById(router.currentRoute.value.params?.id);
});

// Object to v-model.
const updatedTask = ref({
  ...task.value,
});

// Set focus to title ref input manually.
// (Due to limitations of HTML5 autofocus attr).
const title = ref(null);
onMounted(() => {
  title.value?.$el.focus();
})

// Close dialog when unmounting.
onUnmounted(() => {
  dialogRef.value.close();
})

// Save task to Firebase.
const saveTask = async () => {
  loading.value = true;
  try {
    await updateTask(task.value.id, updatedTask.value);
    await router.push('/');
    loading.value = false;
    dialogRef.value.close();
  } catch (e) {
    console.log(e);
  }
}

// Remove task from Firebase.
const removeTask = async () => {
  loading.value = true;
  try {
    await deleteTask(task.value.id);
    await router.push('/');
    loading.value = false;
    dialogRef.value.close();
  } catch (e) {
    console.log(e);
  }
}
</script>
