<template>
  <div class="admin-dashboard">
    <header class="dashboard-header">
      <h1>Панель администратора</h1>
      <div class="user-info">
        <span>Добро пожаловать, Администратор</span>
      </div>
    </header>

    <div class="dashboard-content">
      <!-- Блок редактирования фона -->
      <section class="admin-section background-section">
        <h2>Настройки главного фона</h2>
        <div class="background-controls">
          <div class="control-group">
            <label>Тип фона:</label>
            <select v-model="backgroundSettings.type" @change="updateBackground">
              <option value="color">Цвет</option>
              <option value="gradient">Градиент</option>
              <option value="image">Изображение</option>
            </select>
          </div>

          <div v-if="backgroundSettings.type === 'color'" class="control-group">
            <label>Цвет:</label>
            <input 
              type="color" 
              v-model="backgroundSettings.color" 
              @change="updateBackground"
            />
          </div>

          <div v-if="backgroundSettings.type === 'gradient'" class="gradient-controls">
            <div class="control-group">
              <label>Первый цвет:</label>
              <input 
                type="color" 
                v-model="backgroundSettings.gradientStart" 
                @change="updateBackground"
              />
            </div>
            <div class="control-group">
              <label>Второй цвет:</label>
              <input 
                type="color" 
                v-model="backgroundSettings.gradientEnd" 
                @change="updateBackground"
              />
            </div>
          </div>

          <div v-if="backgroundSettings.type === 'image'" class="control-group">
            <label>URL изображения:</label>
            <input 
              type="url" 
              v-model="backgroundSettings.imageUrl" 
              @change="updateBackground"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="preview-section">
            <h3>Предварительный просмотр:</h3>
            <div class="background-preview" :style="backgroundPreviewStyle"></div>
          </div>
        </div>
      </section>

      <!-- Блок управления постами -->
      <section class="admin-section posts-section">
        <div class="section-header">
          <h2>Управление постами</h2>
          <button @click="showAddPostForm = true" class="btn btn-primary">
            Добавить пост
          </button>
        </div>

        <!-- Форма добавления/редактирования поста -->
        <div v-if="showAddPostForm || editingPost" class="post-form">
          <h3>{{ editingPost ? 'Редактировать пост' : 'Добавить новый пост' }}</h3>
          <form @submit.prevent="savePost">
            <div class="form-group">
              <label>Заголовок:</label>
              <input 
                type="text" 
                v-model="currentPost.title" 
                required
                placeholder="Введите заголовок поста"
              />
            </div>
            <div class="form-group">
              <label>Содержание:</label>
              <textarea 
                v-model="currentPost.content" 
                required
                placeholder="Введите содержание поста"
                rows="5"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Автор:</label>
              <input 
                type="text" 
                v-model="currentPost.author" 
                required
                placeholder="Имя автора"
              />
            </div>
            <div class="form-group">
              <label>Изображение (URL):</label>
              <input 
                type="url" 
                v-model="currentPost.imageUrl" 
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success">
                {{ editingPost ? 'Сохранить изменения' : 'Добавить пост' }}
              </button>
              <button type="button" @click="cancelPostEdit" class="btn btn-secondary">
                Отмена
              </button>
            </div>
          </form>
        </div>

        <!-- Список постов -->
        <div class="posts-list">
          <div v-for="post in posts" :key="post.id" class="post-item">
            <div class="post-image" v-if="post.imageUrl">
              <img :src="post.imageUrl" :alt="post.title" />
            </div>
            <div class="post-content">
              <h3>{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.content.substring(0, 150) }}...</p>
              <div class="post-meta">
                <span>Автор: {{ post.author }}</span>
                <span>Дата: {{ formatDate(post.createdAt) }}</span>
              </div>
            </div>
            <div class="post-actions">
              <button @click="editPost(post)" class="btn btn-edit">
                Редактировать
              </button>
              <button @click="deletePost(post.id)" class="btn btn-delete">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Блок контактной информации -->
      <section class="admin-section contacts-section">
        <h2>Контактная информация</h2>
        <form @submit.prevent="saveContacts" class="contacts-form">
          <div class="form-group">
            <label>Адрес:</label>
            <input 
              type="text" 
              v-model="contacts.address" 
              placeholder="Введите адрес"
            />
          </div>
          <div class="form-group">
            <label>Номер телефона:</label>
            <input 
              type="tel" 
              v-model="contacts.phone" 
              placeholder="+7 (999) 123-45-67"
            />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              v-model="contacts.email" 
              placeholder="info@example.com"
            />
          </div>
          <div class="form-group">
            <label>Часы работы:</label>
            <input 
              type="text" 
              v-model="contacts.workingHours" 
              placeholder="Пн-Пт: 9:00-18:00"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Сохранить контакты
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Настройки фона
const backgroundSettings = ref({
  type: 'color',
  color: '#ffffff',
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
  imageUrl: ''
})

// Посты
const posts = ref([
  {
    id: 1,
    title: 'Первый пост',
    content: 'Это содержание первого поста. Здесь может быть любая информация о вашем проекте или новости.',
    author: 'Администратор',
    imageUrl: '/placeholder.svg?height=200&width=300',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: 'Второй пост',
    content: 'Содержание второго поста с интересной информацией и полезными советами для читателей.',
    author: 'Редактор',
    imageUrl: '/placeholder.svg?height=200&width=300',
    createdAt: new Date('2024-01-10')
  }
])

const showAddPostForm = ref(false)
const editingPost = ref(null)
const currentPost = ref({
  title: '',
  content: '',
  author: '',
  imageUrl: ''
})

// Контакты
const contacts = ref({
  address: 'г. Москва, ул. Примерная, д. 123',
  phone: '+7 (999) 123-45-67',
  email: 'info@example.com',
  workingHours: 'Пн-Пт: 9:00-18:00'
})

// Вычисляемые свойства
const backgroundPreviewStyle = computed(() => {
  switch (backgroundSettings.value.type) {
    case 'color':
      return { backgroundColor: backgroundSettings.value.color }
    case 'gradient':
      return {
        background: `linear-gradient(135deg, ${backgroundSettings.value.gradientStart}, ${backgroundSettings.value.gradientEnd})`
      }
    case 'image':
      return {
        backgroundImage: `url(${backgroundSettings.value.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    default:
      return { backgroundColor: '#ffffff' }
  }
})

// Методы для фона
const updateBackground = () => {
  console.log('Фон обновлен:', backgroundSettings.value)
}

// Методы для постов
const savePost = () => {
  if (editingPost.value) {
    const index = posts.value.findIndex(p => p.id === editingPost.value.id)
    posts.value[index] = { ...editingPost.value, ...currentPost.value }
    editingPost.value = null
  } else {
    const newPost = {
      id: Date.now(),
      ...currentPost.value,
      createdAt: new Date()
    }
    posts.value.unshift(newPost)
  }
  
  resetPostForm()
}

const editPost = (post) => {
  editingPost.value = post
  currentPost.value = { ...post }
  showAddPostForm.value = false
}

const deletePost = (postId) => {
  if (confirm('Вы уверены, что хотите удалить этот пост?')) {
    posts.value = posts.value.filter(p => p.id !== postId)
  }
}

const cancelPostEdit = () => {
  resetPostForm()
}

const resetPostForm = () => {
  showAddPostForm.value = false
  editingPost.value = null
  currentPost.value = {
    title: '',
    content: '',
    author: '',
    imageUrl: ''
  }
}

// Методы для контактов
const saveContacts = () => {
  console.log('Контакты сохранены:', contacts.value)
  alert('Контактная информация успешно сохранена!')
}

// Утилиты
const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

onMounted(() => {
  console.log('Админ-панель загружена')
})
</script>

<style lang="scss" scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .dashboard-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }

    .user-info {
      font-size: 1rem;
      opacity: 0.9;
    }
  }

  .dashboard-content {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .admin-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;

    h2 {
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    h3 {
      color: #4a5568;
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
  }

  // Стили для блока фона
  .background-controls {
    .control-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #4a5568;
      }

      select, input {
        width: 100%;
        max-width: 300px;
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #667eea;
        }
      }

      input[type="color"] {
        width: 60px;
        height: 40px;
        padding: 0;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
    }

    .gradient-controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .preview-section {
      margin-top: 2rem;

      .background-preview {
        width: 100%;
        height: 150px;
        border-radius: 8px;
        border: 2px solid #e2e8f0;
        margin-top: 1rem;
      }
    }
  }

  // Стили для блока постов
  .posts-section {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .post-form {
      background: #f7fafc;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 1px solid #e2e8f0;

      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }

        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;

          &:focus {
            outline: none;
            border-color: #667eea;
          }
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }
      }

      .form-actions {
        display: flex;
        gap: 1rem;
      }
    }

    .posts-list {
      .post-item {
        display: grid;
        grid-template-columns: 150px 1fr auto;
        gap: 1.5rem;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        margin-bottom: 1rem;
        transition: box-shadow 0.3s ease;

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .post-image {
          img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 6px;
          }
        }

        .post-content {
          h3 {
            margin: 0 0 0.5rem 0;
            color: #2d3748;
          }

          .post-excerpt {
            color: #718096;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .post-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.875rem;
            color: #a0aec0;
          }
        }

        .post-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-self: start;
        }
      }
    }
  }

  // Стили для блока контактов
  .contacts-form {
    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #4a5568;
      }

      input {
        width: 100%;
        max-width: 400px;
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #667eea;
        }
      }
    }
  }

  // Стили кнопок
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;

    &.btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
    }

    &.btn-success {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
      }
    }

    &.btn-secondary {
      background: #e2e8f0;
      color: #4a5568;

      &:hover {
        background: #cbd5e0;
      }
    }

    &.btn-edit {
      background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(237, 137, 54, 0.4);
      }
    }

    &.btn-delete {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(245, 101, 101, 0.4);
      }
    }
  }
}

// Адаптивность
@media (max-width: 768px) {
  .admin-dashboard {
    .dashboard-header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .dashboard-content {
      padding: 1rem;
    }

    .admin-section {
      padding: 1.5rem;
    }

    .posts-section .posts-list .post-item {
      grid-template-columns: 1fr;
      text-align: center;

      .post-actions {
        flex-direction: row;
        justify-content: center;
      }
    }

    .posts-section .section-header {
      flex-direction: column;
      gap: 1rem;
    }

    .background-controls .gradient-controls {
      grid-template-columns: 1fr;
    }
  }
}
</style>