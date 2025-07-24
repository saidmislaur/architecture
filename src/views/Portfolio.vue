<template>
  <div class="portfolio-page">
    <Header />

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else class="portfolio-page__projects">
        <PortfolioSection :projects="projects"/>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import Header from '../components/Header.vue';
import PortfolioSection from '../components/PortfolioSection.vue';
import { API_URL } from '../api/config'

const router = useRouter()
const projects = ref([])
const loading = ref(true)

const fetchProjects = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/projects`)
    projects.value = res.data
  } catch (err) {
    console.error('Ошибка загрузки проектов', err)
  } finally {
    loading.value = false
  }
}

const goToProject = (id) => {
  router.push(`/projects/${id}`)
}

const getImageUrl = (imgPath) => {
  return `http://localhost:5000/${imgPath}`
}

onMounted(fetchProjects)
</script>

<style scoped lang="scss">
.portfolio-page {

  .loading {
    font-size: 1.2rem;
  }

  &__projects {
    padding: 5vh 10vh;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 3rem;
  }

  .project-card {
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 10px;
    transition: box-shadow 0.2s;
    background-color: #fff;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0 0 0.5rem;
    }

    p {
      color: #555;
      font-size: 0.95rem;
    }
  }
}
</style>
