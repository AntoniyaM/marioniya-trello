<template>
  <Panel class="task-add" header="Create task">
    new task
  </Panel>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const { createTask } = useBoardStore();
const route = useRoute();
</script>
