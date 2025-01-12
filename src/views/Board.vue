<script setup>
import { getCurrentUser } from 'vuefire'
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import { useDialog } from 'primevue/usedialog'

// Data.
const { swimLanes, getTasksByLane, getTaskById, updateTask } = useBoardStore()
const user = ref(await getCurrentUser())
const router = useRouter()
const dialog = useDialog()
const emit = defineEmits(['after-hide'])

const taskIsOpen = computed(() => {
  return router.currentRoute.value.name === 'task'
})

// Methods.
// Pass options to PrimeVue dialog.
const openDialog = (header) => {
  dialog.open(RouterView, {
    onClose: () => {
      // Todo: PrimeVue creates a new dialog on every open.
      // Even manual 'after-hide' emit does not trigger garbage collection.
      emit('after-hide')
      router.push('/')
    },
    props: {
      blockScroll: true,
      dismissableMask: true,
      header,
      modal: true,
    },
  })
}

// Navigate to task (opens in dialog).
const editTask = (id) => {
  router.push({ name: 'task', params: { id } })
  openDialog('Edit task')
}

// Pin/unpin task.
const pinTask = async (taskId) => {
  const task = getTaskById(taskId)
  await updateTask(taskId, { ...task, isPinned: !task.isPinned })
}

// Navigate to new task form (opens in dialog).
const newTask = () => {
  router.push('/task/add')
  openDialog('Create task')
}

// Logic related to Draggable API.
// Todo: extract into a mixin or helper util.
const grabTask = (e, taskId, swimLaneId) => {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.setData('task-id', taskId)
  e.dataTransfer.setData('current-status', swimLaneId)
}

const dropTask = async (e, targetSwimLaneId) => {
  const taskId = e.dataTransfer.getData('task-id')
  const sourceSwimLaneId = e.dataTransfer.getData('current-status')

  // Do the update only if the task status is actually changed.
  if (sourceSwimLaneId !== targetSwimLaneId) {
    try {
      await updateTask(taskId, { status: targetSwimLaneId })
    } catch (e) {
      console.log(e)
    }
  }
}

// Mounted.
onMounted(() => {
  // If user is not logged in, redirect to login page.
  if (!user.value?.email) {
    router.push('/login')
  }

  // When visiting /task/:id directly.
  if (taskIsOpen.value) {
    editTask(router.currentRoute.value.params.id)
  }

  // When visiting /task/add directly.
  if (router.currentRoute.value.name === 'new-task') {
    newTask()
  }
})
</script>

<template>
  <div class="container">
    <div class="board">
      <div class="board__title">
        <h1>Mario & Antoniya's Trello Board</h1>
        <BaseButton icon="pi pi-plus" label="Create task" raised @click="newTask" />
      </div>
      <div class="board__swim-lanes">
        <ContentCard
          class="swim-lane"
          v-for="swimLane in swimLanes"
          :key="swimLane.id"
          @drop="dropTask($event, swimLane.id)"
          @dragover.prevent
          @dragenter.prevent
        >
          <template #header>
            <div class="swim-lane__name p-card-title">
              {{ swimLane.name }}
            </div>
          </template>
          <template #content>
            <div class="swim-lane__task-list">
              <Panel
                class="task"
                v-for="task in getTasksByLane(swimLane.id)"
                :key="task.id"
                draggable="true"
                @dragstart="grabTask($event, task.id, swimLane.id)"
                @click="editTask(task.id)"
              >
                <template #header>
                  <div class="p-panel-title">{{ task.title }}</div>
                </template>
                <template #icons>
                  <BaseButton
                    icon="pi pi-thumbtack"
                    rounded
                    :text="!task.isPinned"
                    raised
                    v-tooltip="`${task.isPinned ? 'Unpin' : 'Pin'} this task.`"
                    @click.stop="pinTask(task.id)"
                  />
                </template>
                <div class="task__description" v-html="task.description || '–'"></div>
              </Panel>
            </div>
          </template>
        </ContentCard>
      </div>
      <DynamicDialog :pt="{ mask: { style: 'backdrop-filter: blur(2px)' } }" />
    </div>
  </div>
</template>
