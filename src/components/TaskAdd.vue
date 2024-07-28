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
      <TextEditor
        v-model="newTask.description"
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
            label="Save task"
            type="submit"
            :icon="`pi pi-${loading ? 'spinner' : 'check'}`" />
        <BaseButton
            label="Cancel"
            severity="danger"
            @click="cancel"
            :icon="`pi pi-${loading ? 'spinner' : 'times'}`" />
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
  isPinned: false,
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

// Cancel.
const cancel = () => {
  router.push('/');
  dialogRef.value.close();
}
</script>
