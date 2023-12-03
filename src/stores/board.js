import { ref } from 'vue';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';
import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board', () => {
  // Board lanes.
  const swimLanes = ref([
    {
      id: 1,
      name: 'Todo 😓',
    },
    {
      id: 2,
      name: 'In progress ⏳',
    },
    {
      id: 3,
      name: 'Done ✅',
    },
  ]);

  // Firebase data.
  const db = useFirestore();
  const tasks = useCollection(collection(db, 'tasks'));

  // Getters.
  const getTasksByLane = (laneId) => {
    return tasks.value.filter((task) => task.status === laneId);
  }

  const getTaskById = (id) => {
    return tasks.value.find((task) => task.id === id);
  }

  return {
    swimLanes,
    tasks,
    getTasksByLane,
    getTaskById
  }
})
