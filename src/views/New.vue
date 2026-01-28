<template>
  <form
    class="card task-cardTwo"
    @submit.prevent="onSubmit"
  >
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input
        id="title"
        v-model="name"
        type="text"
      >
      <p
        v-if="nameError"
        class="error"
      >
        {{ nameError }}
      </p>
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input
        id="date"
        v-model="deadline"
        type="date"
        @input="isDateOk"
      >
      <p
        v-if="deadlineError"
        class="error"
      >
        {{ deadlineError }}
      </p>
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="description"
      />
      <p
        v-if="descriptionError"
        class="error"
      >
        {{ descriptionError }}
      </p>
    </div>

    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>

    <button
      :disabled="isOk"
      class="btn primary"
    >
      Создать
    </button>
  </form>
</template>


<script>
import { computed, ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default {
  setup() {
    let name = ref('')
    let deadline = ref('')
    let description = ref('')
    let statusRef = ref('primary')
    let errorMessage = ref('')
    let store = useStore()
    let router = useRouter()

    let isOk = computed(() => {
      if (name.value === '' || deadline.value === '' || description.value === '') return true
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(deadline.value)
      return selectedDate < today
    })

    let nameError = computed(() => name.value.trim() === '' ? 'Название обязательно' : '')
    let deadlineError = computed(() => {
      if (deadline.value.trim() === '') return 'Дата обязательна'
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(deadline.value)
      return selectedDate < today ? 'Дата не может быть в прошлом' : ''
    })
    let descriptionError = computed(() => description.value.trim() === '' ? 'Описание обязательно' : '')

    let isDateOk = () => {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let selectedDate = new Date(deadline.value);
      statusRef.value = selectedDate < today ? 'danger' : 'primary';
    }

    function onSubmit() {
      axios.post('https://freelance-ae474-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
        name: name.value,
        deadline: deadline.value,
        description: description.value,
        status: statusRef.value
      })
        .then((res) => {
          let newObj = {
            id: res.data.name,
            name: name.value,
            deadline: deadline.value,
            description: description.value,
            status: statusRef.value
          }
          store.commit('pushTask', newObj)
          name.value = ''
          deadline.value = ''
          description.value = ''
          errorMessage.value = ''
          router.push('/')
        })
        .catch(() => {
          errorMessage.value = 'Ошибка при создании задачи. Попробуйте ещё раз.'
        })
    }


    return {
      name,
      deadline,
      description,
      onSubmit,
      isOk,
      isDateOk,
      errorMessage,
      nameError,
      deadlineError,
      descriptionError
    }
  }
}
</script>