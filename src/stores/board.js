import { ref } from 'vue';
import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';
import { defineStore } from 'pinia';

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
  let tasks = useCollection(collection(db, 'tasks'));

  // Getters.
  const getTasksByLane = (laneId) => {
    // Also sort tasks by pinned status.
    return tasks.value
      .filter((task) => task.status === laneId)
      .sort((a, b) => b.isPinned - a.isPinned);
  }

  const getTaskById = (id) => {
    return tasks.value.find((task) => task.id === id);
  }

  // Actions.
  const createTask = async (payload) => {
    return await addDoc(collection(db, 'tasks'), {
      ...payload,
    });
  }

  const updateTask = async (id, payload) => {
    const task = doc(db, 'tasks', id);
    if (task) {
      await updateDoc(task, payload);
    }
  }

  const deleteTask = async (id) => {
    const task = doc(db, 'tasks', id);
    if (task) {
      await deleteDoc(task);
    }
  }

  const refreshStore = () => {
    tasks = useCollection(collection(db, 'tasks'));
  }

  return {
    swimLanes,
    tasks,
    getTasksByLane,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    refreshStore,
  }
})
