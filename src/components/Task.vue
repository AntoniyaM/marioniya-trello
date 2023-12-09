<template>
  <Panel v-if="task" class="task-edit" header="Edit task">
    {{ task.title }}
  </Panel>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const { getTaskById } = useBoardStore();
const route = useRoute();

const task = computed(() => {
  return getTaskById(route.params?.id);
});
</script>
