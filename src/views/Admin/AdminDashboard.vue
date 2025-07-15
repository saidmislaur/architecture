<template>
  <div class="admin-panel">
    <header class="admin-header">
      <div class="container">
        <h1>Админ-панель ARCH STUDIO</h1>
        <div class="admin-stats">
          <div class="stat-item">
            <span class="stat-number">{{ stats.totalProjects }}</span>
            <span class="stat-label">Проектов</span>
          </div>
          <div class="admin-logout">
            <button @click="logout">Выход</button>
          </div>
        </div>
      </div>
    </header>

    <nav class="admin-nav">
      <div class="container">
        <button 
          @click="currentView = 'list'"
          :class="['nav-btn', { active: currentView === 'list' }]"
        >
          Список проектов
        </button>
        <button 
          @click="currentView = 'create'"
          :class="['nav-btn', { active: currentView === 'create' }]"
        >
          Создать проект
        </button>
      </div>
    </nav>

    <main class="admin-main">
      <div class="container">
        <div v-if="currentView === 'list'" class="projects-list">
          <div class="list-header">
            <h2>Список проектов</h2>
            <div class="list-controls">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Поиск проектов..."
                class="search-input"
              />
              <select v-model="filterCategory" class="filter-select">
                <option value="all">Все категории</option>
                <option value="residential">Жилая</option>
                <option value="commercial">Коммерческая</option>
                <option value="public">Общественная</option>
              </select>
            </div>
          </div>

          <div class="projects-grid">
            <div 
              v-for="project in filteredProjects" 
              :key="project._id"
              class="project-card"
            >
              <div class="project-card__image">
                <img 
                  :src="getImageUrl(project.photos[0]?.image)" 
                  :alt="project.title"
                  @error="handleImageError"
                />
              </div>
              <div class="project-card__content">
                <h3>{{ project.title }}</h3>
                <p>{{ project.type }}</p>
                <div class="project-card__meta">
                  <span class="status" :class="project.status">{{ getStatusText(project.status) }}</span>
                  <span class="date">{{ formatDate(project.createdAt) }}</span>
                </div>
                <div class="project-card__actions">
                  <button @click="editProject(project)" class="btn btn-edit">
                    Редактировать
                  </button>
                  <button @click="deleteProject(project._id)" class="btn btn-delete">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredProjects.length === 0" class="empty-state">
            <h3>Проекты не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        </div>

        <div v-if="currentView === 'create' || currentView === 'edit'" class="project-form">
          <div class="form-header">
            <h2>{{ currentView === 'create' ? 'Создать проект' : 'Редактировать проект' }}</h2>
            <button @click="currentView = 'list'" class="btn btn-secondary">
              Назад к списку
            </button>
          </div>

          <form @submit.prevent="saveProject" class="form">
            <div class="form-section">
              <h3>Основная информация</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Название проекта *</label>
                  <input 
                    v-model="currentProject.title" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Описание проекта</label>
                  <input 
                    v-model="currentProject.description" 
                    type="text" 
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Тип проекта</label>
                  <input 
                    v-model="currentProject.type" 
                    type="text" 
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Категория *</label>
                  <select v-model="currentProject.category" required class="form-select">
                    <option value="">Выберите категорию</option>
                    <option value="residential">Жилая архитектура</option>
                    <option value="commercial">Коммерческая архитектура</option>
                    <option value="public">Общественная архитектура</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Статус</label>
                  <select v-model="currentProject.status" class="form-select">
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликован</option>
                    <option value="archived">Архив</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Год</label>
                  <input 
                    v-model.number="currentProject.year" 
                    type="number" 
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Площадь</label>
                  <input 
                    v-model="currentProject.area" 
                    type="text" 
                    class="form-input"
                  />
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Локация</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Адрес *</label>
                  <input 
                    v-model="currentProject.location.address" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Район *</label>
                  <input 
                    v-model="currentProject.location.district" 
                    type="text" 
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Город *</label>
                  <input 
                    v-model="currentProject.location.city" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label>Площадь участка *</label>
                  <input 
                    v-model="currentProject.location.plotArea" 
                    type="text" 
                    class="form-input"
                  />
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Фотографии проекта</h3>
              <div class="photos-manager">
                <div 
                  v-for="(photo, index) in currentProject.photos" 
                  :key="index"
                  class="photo-item"
                >
                  <div class="photo-preview">
                    <img :src="getImageUrl(photo.image)" :alt="`Фото ${index + 1}`" />
                    <button 
                      type="button"
                      @click="removePhoto(index)" 
                      class="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                  <div class="photo-controls">
                    <select v-model="photo.layout" class="form-select">
                      <option value="small">Маленький</option>
                      <option value="medium">Средний</option>
                      <option value="large">Большой</option>
                    </select>
                    <textarea 
                      v-model="photo.description" 
                      placeholder="Описание фото..."
                      class="form-textarea"
                    ></textarea>
                  </div>
                </div>
                
                <div class="add-photo">
                  <input 
                    type="file" 
                    @change="uploadPhoto" 
                    accept="image/*"
                    class="file-input"
                    ref="photoInput"
                  />
                  <button type="button" @click="$refs.photoInput.click()" class="btn btn-secondary">
                    Добавить фото
                  </button>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Ключевые особенности</h3>
              <div class="features-manager">
                <div 
                  v-for="(feature, index) in currentProject.keyFeatures" 
                  :key="index"
                  class="feature-item"
                >
                  <div class="form-grid">
                    <div class="form-group">
                      <label>Иконка</label>
                      <input 
                        v-model="feature.icon" 
                        type="text" 
                        class="form-input"
                        placeholder="🏠"
                      />
                    </div>
                    <div class="form-group">
                      <label>Заголовок</label>
                      <input 
                        v-model="feature.title" 
                        type="text" 
                        class="form-input"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Описание</label>
                    <textarea 
                      v-model="feature.description" 
                      class="form-textarea"
                    ></textarea>
                  </div>
                  <button 
                    type="button"
                    @click="removeFeature(index)" 
                    class="btn btn-delete btn-small"
                  >
                    Удалить
                  </button>
                </div>
                
                <button type="button" @click="addFeature" class="btn btn-secondary">
                  Добавить особенность
                </button>
              </div>
            </div>

            <div class="form-section">
              <h3>Галерея</h3>
              <div class="gallery-manager">
                <div 
                  v-for="(item, index) in currentProject.galleryItems" 
                  :key="index"
                  class="gallery-item"
                >
                  <div class="gallery-preview">
                    <img :src="getImageUrl(item.image)" :alt="item.title" />
                    <button 
                      type="button"
                      @click="removeGalleryItem(index)" 
                      class="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                  <div class="gallery-controls">
                    <input 
                      v-model="item.title" 
                      type="text" 
                      placeholder="Название..."
                      class="form-input"
                    />
                    <textarea 
                      v-model="item.description" 
                      placeholder="Описание..."
                      class="form-textarea"
                    ></textarea>
                  </div>
                </div>
                
                <div class="add-gallery-item">
                  <input 
                    type="file" 
                    @change="uploadGalleryImage" 
                    accept="image/*"
                    class="file-input"
                    ref="galleryInput"
                  />
                  <button type="button" @click="$refs.galleryInput.click()" class="btn btn-secondary">
                    Добавить в галерею
                  </button>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Сохранение...' : 'Сохранить проект' }}
              </button>
              <button type="button" @click="resetForm" class="btn btn-secondary">
                Сбросить
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <div v-if="notification.show" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { removeItem } from '../../utils/auth'

const API_BASE = 'http://localhost:5000/api'

const router = useRouter()


const currentView = ref('list')
const loading = ref(false)
const searchQuery = ref('')
const filterCategory = ref('all')

const projects = ref([])
const stats = reactive({
  totalProjects: 0
})

const notification = reactive({
  show: false,
  message: '',
  type: 'success'
})

const currentProject = reactive({
  title: '',
  description: '',
  type: '',
  category: '',
  status: 'draft',
  year: new Date().getFullYear(),
  area: '',
  photos: [],
  location: {
    address: '',
    district: '',
    city: '',
    plotArea: '',
    mapImage: ''
  },
  keyFeatures: [],
  galleryItems: []
})

const editingProjectId = ref(null)

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (filterCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === filterCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.location.city.toLowerCase().includes(query)
    )
  }

  return filtered
})

const fetchProjects = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(`${API_BASE}/projects`)
    projects.value = data
  } catch (e) {
    showNotification('Ошибка загрузки проектов', 'error')
  } finally {
    loading.value = false
  }
}

const fetchStats = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/stats/data`)
    stats.totalProjects = data.totalProjects
  } catch (e) {
    console.error('Ошибка загрузки статистики:', e)
  }
}

const saveProject = async () => {
  try {
    loading.value = true

    const url = editingProjectId.value
      ? `${API_BASE}/projects/${editingProjectId.value}`
      : `${API_BASE}/projects`

    const method = editingProjectId.value ? 'put' : 'post'

    await axios[method](url, currentProject)

    showNotification('Проект сохранен успешно')
    await fetchProjects()
    await fetchStats()
    currentView.value = 'list'
    resetForm()
  } catch (e) {
    showNotification('Ошибка сохранения проекта', 'error')
  } finally {
    loading.value = false
  }
}

const deleteProject = async (id) => {
  if (!confirm('Вы уверены, что хотите удалить этот проект?')) return

  try {
    loading.value = true
    await axios.delete(`${API_BASE}/projects/${id}`)
    showNotification('Проект удален')
    await fetchProjects()
    await fetchStats()
  } catch (e) {
    showNotification('Ошибка удаления проекта', 'error')
  } finally {
    loading.value = false
  }
}

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const { data } = await axios.post(`${API_BASE}/upload/single`, formData)
  return data.imageUrl
}

// --- Form Methods ---
const editProject = (project) => {
  Object.assign(currentProject, JSON.parse(JSON.stringify(project)))
  editingProjectId.value = project._id
  currentView.value = 'edit'
}

const resetForm = () => {
  Object.assign(currentProject, {
    title: '',
    description: '',
    type: '',
    category: '',
    status: 'draft',
    year: new Date().getFullYear(),
    area: '',
    photos: [],
    location: {
      address: '',
      district: '',
      city: '',
      plotArea: '',
      mapImage: ''
    },
    keyFeatures: [],
    galleryItems: []
  })
  editingProjectId.value = null
}

const uploadPhoto = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  try {
    loading.value = true
    const imageUrl = await uploadImage(file)
    currentProject.photos.push({ image: imageUrl, layout: 'medium', description: '' })
    e.target.value = ''
  } catch (e) {
    showNotification('Ошибка загрузки изображения', 'error')
  } finally {
    loading.value = false
  }
}

const uploadGalleryImage = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  try {
    loading.value = true
    const imageUrl = await uploadImage(file)
    currentProject.galleryItems.push({ image: imageUrl, title: '', description: '' })
    e.target.value = ''
  } catch (e) {
    showNotification('Ошибка загрузки изображения', 'error')
  } finally {
    loading.value = false
  }
}

const removePhoto = (i) => {
  currentProject.photos.splice(i, 1)
}

const removeGalleryItem = (i) => {
  currentProject.galleryItems.splice(i, 1)
}

const addFeature = () => {
  currentProject.keyFeatures.push({ icon: '🏠', title: '', description: '' })
}

const removeFeature = (i) => {
  currentProject.keyFeatures.splice(i, 1)
}

// --- Utilities ---
const getImageUrl = (path) => {
  if (!path) return 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
  if (path.startsWith('http')) return path
  return `http://localhost:5000${path}`
}

const handleImageError = (e) => {
  e.target.src = 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

const getStatusText = (status) => {
  const map = {
    draft: 'Черновик',
    published: 'Опубликован',
    archived: 'Архив'
  }
  return map[status] || status
}

const showNotification = (msg, type = 'success') => {
  notification.message = msg
  notification.type = type
  notification.show = true

  setTimeout(() => {
    notification.show = false
  }, 3000)
}

const logout = () => {
  removeItem()
  router.push('/admin-login')
}

onMounted(() => {
  fetchProjects()
  fetchStats()
})
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Admin Header
.admin-header {
  background: #333;
  color: white;
  padding: 1rem 0;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 300;
  }
}

.admin-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;

  .stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
  }
}

//admin-btn 
.admin-logout {
  display: flex;
  align-items: center; 

  button {
    padding: 10px 40px;
    background-color: #e4e0e0;
    border: none;
    border-radius: 5px;
    color: rgb(26, 25, 25);
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #cbcbcb;
    }
  }
}

// Admin Navigation
.admin-nav {
  background: white;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;

  .container {
    display: flex;
    gap: 1rem;
  }
}

.nav-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }

  &.active {
    background: #333;
    color: white;
    border-color: #333;
  }
}

// Main Content
.admin-main {
  padding: 2rem 0;
}

// Projects List
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 300;
  }
}

.list-controls {
  display: flex;
  gap: 1rem;
}

.search-input, .filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__image {
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: 1.5rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  text-transform: uppercase;

  &.draft {
    background: #fef3c7;
    color: #92400e;
  }

  &.published {
    background: #d1fae5;
    color: #065f46;
  }

  &.archived {
    background: #e5e7eb;
    color: #374151;
  }
}

.date {
  color: #666;
}

// Buttons
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &.btn-primary {
    background: #333;
    color: white;

    &:hover {
      background: #555;
    }
  }

  &.btn-secondary {
    background: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #e5e5e5;
    }
  }

  &.btn-edit {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &.btn-delete {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }

  &.btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Form Styles
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 300;
  }
}

.form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 3rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: #333;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #555;
  }
}

.form-input, .form-select, .form-textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #333;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

// Photos Manager
.photos-manager {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.photo-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.photo-preview {
  position: relative;
  width: 150px;
  height: 100px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-photo {
  text-align: center;
  padding: 2rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
}

.file-input {
  display: none;
}

// Features Manager
.features-manager {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

// Gallery Manager
.gallery-manager {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.gallery-preview {
  position: relative;
  width: 120px;
  height: 80px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

.gallery-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-gallery-item {
  text-align: center;
  padding: 2rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
}

// Form Actions
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

// Empty State
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;

  h3 {
    margin-bottom: 0.5rem;
  }
}

// Loading
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Notification
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  color: white;
  z-index: 9999;
  animation: slideIn 0.3s ease;

  &.success {
    background: #10b981;
  }

  &.error {
    background: #ef4444;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

// Responsive
@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .list-controls {
    width: 100%;
    flex-direction: column;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .photo-item, .gallery-item {
    flex-direction: column;
  }

  .photo-preview, .gallery-preview {
    width: 100%;
    height: 200px;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
