<template>
  <div class="container">
    <div class="board">
      <h1>Mario & Antoniya's Trello Board</h1>
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
                  @click="openTask(task.id)"
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
import { storeToRefs } from 'pinia';
import { useDialog } from 'primevue/usedialog';

const user = ref(await getCurrentUser());
const router = useRouter();
const { swimLanes } = storeToRefs(useBoardStore());
const { getTasksByLane } = useBoardStore();
const dialog = useDialog();

const taskIsOpen = computed(() => {
  return router.currentRoute.value.name === 'task';
});

// Navigate to task (open in dialog).
const openTask = (id) => {
  router.push({ name: 'task', params: { id } });
  dialog.open(RouterView, {
    onClose: closeOverlay
  });
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

  if (taskIsOpen.value) {
    openTask(router.currentRoute.value.params.id);
  }
});
</script>
