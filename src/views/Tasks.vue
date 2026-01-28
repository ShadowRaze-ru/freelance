<template>
  <div
    v-if="loading"
    class="loading-container"
  >
    <div class="loader" />
    <p class="text-white">
      Загрузка задач...
    </p>
  </div>

  <div
    v-else-if="error"
    class="error-container"
  >
    <p class="text-white">
      Ошибка загрузки задач: {{ error }}
    </p>
    <button
      class="btn primary"
      @click="loadTasks"
    >
      Повторить
    </button>
  </div>

  <template v-else-if="tasks.length !== 0">
    <h3
      class="text-white"
      style="margin-top: 90px;"
    >
      Всего активных задач: {{ activeTasksCount }}
    </h3>

    <div
      v-for="task in tasks"
      :key="task.id"
      class="card"
    >
      <h2 class="card-title">
        {{ task.name }}
        <AppStatus :type="task.status" />
      </h2>

      <p>
        <strong>
          <small>
            {{ task.deadline }}
          </small>
        </strong>
      </p>

      <router-link :to="'/task/' + task.id">
        <button class="btn primary">
          Посмотреть
        </button>
      </router-link>
    </div>
  </template>

  <h1
    v-else
    class="center"
  >
    Задач пока нет
  </h1>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import AppStatus from '../components/AppStatus.vue'
import { useStore } from 'vuex'
import axios from 'axios';

export default {
  components: { AppStatus },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const error = ref('')

    const tasks = computed(() => store.getters.getTasks || [])

    const activeTasksCount = computed(() => {
      return tasks.value.filter(task => task.status === 'primary').length
    })

    const loadTasks = async () => {
      loading.value = true
      error.value = ''
      try {
        const res = await axios.get('https://freelance-ae474-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
        if (res.data) {
          const data = res.data
          const newData = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }))

          store.commit('clearTasks')
          newData.forEach(task => {
            store.commit('pushTask', task)
          })
        }
      } catch (e) {
        console.warn(e)
        error.value = e.message || 'Неизвестная ошибка'
      } finally {
        loading.value = false
      }
    }

    onMounted(loadTasks)

    return {
      tasks,
      activeTasksCount,
      loading,
      error,
      loadTasks
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}
.loader {
  margin-bottom: 20px;
}
</style>