<template>
  <div class="project-details">
    <div v-if="project">
      <h1>{{ project.title }}</h1>
      <p>{{ project.description }}</p>

      <div class="project-images">
        <img
          v-for="(img, index) in project.images"
          :key="index"
          :src="formatImagePath(img)"
          alt="project image"
        />
      </div>
    </div>
    <div v-else>
      <p>Загрузка...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const project = ref(null)

const fetchProject = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/projects/${route.params.id}`)
    project.value = res.data
  } catch (err) {
    console.error('Ошибка при загрузке проекта:', err)
  }
}

const formatImagePath = (path) => {
  if (path.startsWith('http')) return path
  return `http://localhost:5000/${path}`
}

onMounted(fetchProject)
</script>

<style scoped>
.project-details {
  padding: 6rem;
}
.project-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.project-images img {
  max-width: 600px;
  border-radius: 8px;
}
</style>
