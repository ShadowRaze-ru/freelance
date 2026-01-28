<template>
  <div class="card task-card">
    <h2>{{ task?.name }}</h2>
    <div class="cardDes">
      <p>
        <strong>Статус</strong>:
        <AppStatus :type="task?.status" />
      </p>
      <p><strong>Дэдлайн</strong>: {{ task?.deadline }}</p>
      <p><strong>Описание</strong>: {{ task?.description }}</p>
    </div>
    <div>
      <button
        class="btn"
        @click="toWarning"
      >
        Взять в работу
      </button>
      <button
        class="btn primary"
        @click="toEnd"
      >
        Завершить
      </button>
      <button
        class="btn danger"
        @click="toDanger"
      >
        Отменить
      </button>
    </div>
  </div>
</template>

<script>
import AppStatus from '@/components/AppStatus.vue'
import { useStore } from 'vuex'
import { computed, toRefs } from 'vue'

export default {
  components: { AppStatus },
  props: {
    taskId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const { taskId } = toRefs(props)

    const task = computed(() => {
      const tasks = store.getters.getTasks || []
      return tasks.find(item => String(item.id) === String(taskId.value))
    })

    let toWarning = () => {
      store.dispatch('patchStatusTask', { id: taskId.value, status: 'warning' })
    }

    let toEnd = () => {
      store.dispatch('patchStatusTask', { id: taskId.value, status: 'end' })
    }

    let toDanger = () => {
      store.dispatch('patchStatusTask', { id: taskId.value, status: 'danger' })
    }

    return {
      task, toWarning, toEnd, toDanger
    }
  }
}
</script>