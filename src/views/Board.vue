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
              <RouterLink
                  class="task"
                  v-for="task in getTasksByLane(item.id)"
                  :to="{ name: 'task', params: { id: task.id } }"
                  :key="task.id"
              >
                <div class="task__title">
                  <strong>{{ task.title }}</strong>
                </div>
                <div class="task__description">{{ task.description }}</div>
              </RouterLink>
            </div>
          </template>
        </SwimLane>
      </div>
      <div class="board__overlay"
           v-if="showOverlay"
           @click="closeOverlay"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentUser } from 'vuefire';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { storeToRefs } from 'pinia';

const user = ref(await getCurrentUser());
const router = useRouter();
const { swimLanes } = storeToRefs(useBoardStore());
const { getTasksByLane } = useBoardStore();

const showOverlay = computed(() => {
  return router.currentRoute.value.name === 'task';
});

// Close open task.
const closeOverlay = () => {
  router.push({ name: 'board' });
}

// If user is not logged in, redirect to login page.
onMounted(() => {
  if (!user.value?.email) {
    router.push('/login');
  }
});
</script>
