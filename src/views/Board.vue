<template>
  <div class="container">
    <div class="board">
      <div class="board__title">
        <h1>Mario & Antoniya's Trello Board</h1>
        <BaseButton icon="pi pi-plus" label="Create task" @click="newTask" />
      </div>
      <div class="board__swim-lanes">
        <SwimLane
            class="swim-lane"
            v-for="item in swimLanes"
            :key="item.id"
        >
          <template #header>
            <div class="swim-lane__name p-card-title">
              {{ item.name }}
            </div>
          </template>
          <template #content>
            <div class="swim-lane__task-list">
              <Panel
                  :header="task.title"
                  class="task"
                  v-for="task in getTasksByLane(item.id)"
                  :key="task.id"
                  @click="editTask(task.id)"
              >
                <div class="task__description">{{ task.description || '–' }}</div>
              </Panel>
            </div>
          </template>
        </SwimLane>
      </div>
      <DynamicDialog :pt="{ mask: { style: 'backdrop-filter: blur(2px)' } }" />
    </div>
  </div>
</template>

<script setup>
import { getCurrentUser } from 'vuefire';
import { ref, computed, onMounted } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { useDialog } from 'primevue/usedialog';

const user = ref(await getCurrentUser());
const router = useRouter();
const { swimLanes, getTasksByLane } = useBoardStore();
const dialog = useDialog();

const taskIsOpen = computed(() => {
  return router.currentRoute.value.name === 'task';
});

// Pass options to PrimeVue dialog.
const openDialog = (header) => {
  dialog.open(RouterView, {
    onClose: closeOverlay,
    props: {
      blockScroll: true,
      dismissableMask: true,
      header,
      modal: true,
    }
  });
}

// Navigate to task (opens in dialog).
const editTask = (id) => {
  router.push({ name: 'task', params: { id } });
  openDialog('Edit task');
}

// Navigate to new task form (opens in dialog).
const newTask = () => {
  router.push('/task/add');
  openDialog('Create task');
}

// Close open task.
const closeOverlay = () => {
  router.push('/');
}

// If user is not logged in, redirect to login page.
onMounted(() => {
  if (!user.value?.email) {
    router.push('/login');
  }

  // When visiting /task/:id directly.
  if (taskIsOpen.value) {
    editTask(router.currentRoute.value.params.id);
  }

  // When visiting /task/add directly.
  if (router.currentRoute.value.name === 'new-task') {
    newTask();
  }
});
</script>
