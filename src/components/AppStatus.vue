<template>
  <span :class="['badge', type]">{{ nameStatus }}</span>
</template>

<script>
import { computed } from 'vue';

  export default {
    props: ['type'],
    setup(props) {
      let nameStatus = computed(() => {
        if(props.type === 'primary') {
          return 'Активный'
        } else if (props.type === 'warning') {
          return 'Выполняется'
        } else if(props.type === 'danger') {
          return 'Отменено'
        } else {
          return 'Завершено'
        }
      })
      return {
        nameStatus
      }
    }
  }
</script>