<template>
  <div class="card">
    <h1>Путь {{ currentPath }} не найден</h1>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
    setup() {
        const route = useRoute()
        const currentPath = route.path
        return { currentPath }
    }
};
</script>