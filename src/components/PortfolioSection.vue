<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title">Портфолио проектов</h2>

      <div class="projects__controls">
        <div class="projects__search">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Поиск проектов..."
            class="search-input"
          />
        </div>

        <div class="projects__sort">
          <select v-model="sortBy" class="sort-select">
            <option value="year">По году</option>
            <option value="title">По названию</option>
            <option value="area">По площади</option>
          </select>

          <button 
            @click="isGalleryView = !isGalleryView"
            :class="['view-toggle', { active: isGalleryView }]"
          >
            {{ isGalleryView ? 'Список' : 'Сетка' }}
          </button>
        </div>
      </div>

      <div v-if="searchQuery" class="search-results">
        Найдено проектов: {{ filteredProjects.length }}
      </div>

      <div :class="['projects__grid', { 'gallery-view': isGalleryView }]">
        <div 
          v-for="(project, index) in filteredProjects"
          :key="project._id || index"
          class="project-card"
          @click="openProject(project)"
        >
         <RouterLink  :to="`/projects/${project._id}`">
          <div class="project-card__image">
            <img 
              :src="getImageUrl(project.photos[0]?.image)" 
              :alt="project.title" 
            />
            <div class="project-card__overlay">
              <span class="project-card__category">{{ project.category || 'Без категории' }}</span>
              <div class="project-card__tags">
                <span 
                  v-for="(tag, i) in project.tags?.slice(0, 2)" 
                  :key="i" 
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="project-card__content">
            <h3>{{ project.title }}</h3>
            <div class="project-card__meta">
              <span class="location">{{ project.location.city || 'Не указано' }}</span>
            </div>
            <p>{{ project.photos[0]?.description }}</p>
            <span class="project-card__year">
              {{ new Date(project.createdAt).getFullYear() }}
            </span>
          </div>
          </RouterLink>
        </div>
      </div>
      <div v-if="props.limit" class="projects__btn">
        <RouterLink to="/projects">
          <Button value="Показать больше"/>
        </RouterLink>
      </div>

      <div v-if="filteredProjects.length === 0" class="empty-state">
        <h3>Проекты не найдены</h3>
        <p>Попробуйте изменить параметры поиска или фильтры</p>
        <button 
          @click="searchQuery = ''; activeFilter = 'all'" 
          class="reset-btn"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import axios from 'axios'

import Button from './Button.vue'
import { API_URL } from '../api/config'

const props = defineProps({
  projects: Array,
  limit: Number,
  value: String,
})

const activeFilter = ref('all')
const searchQuery = ref('')
const sortBy = ref('year')
const isGalleryView = ref(false)

const displayedProjects = computed(() => {
  if (!props.limit) return props.projects
  return props.projects.slice(0, props.limit)
})

const filteredProjects = computed(() => {
  let filtered = [...displayedProjects.value]

  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(p => p.category === activeFilter.value)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }

  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'year':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'area':
        return (parseInt(b.area) || 0) - (parseInt(a.area) || 0)
      default:
        return 0
    }
  })

  return filtered
})

const openProject = (project) => {
  console.log('Открыт проект:', project)
}

const getImageUrl = (path) => {
  if (!path) return 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
  if (path.startsWith('http')) return path
  return `${API_URL}${path}`
}


</script>

<style scoped lang="scss">
.projects {
  padding: 5rem 0;
  background: #f8f9fa;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  &__btn {
    margin-top: 20px;
    text-align: center;
  }
}

.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  &__image {
    height: 250px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover &__image img {
    transform: scale(1.05);
  }

  &__content {
    padding: 1.5rem;
    position: relative;

    h3 {
      font-size: 1.3rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }
  }

  &__year {
    position: absolute;
    top: 1.5rem;
    right: 0.5rem;
    background: #333;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
}
</style>
