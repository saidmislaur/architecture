<template>
  <div class="admin-dashboard">
    <h1>Админ-панель</h1>

    <!-- Список проектов -->
    <section class="project-list">
      <h2>Существующие проекты</h2>
      <div v-if="projects.length">
        <div
          class="project-item"
          v-for="(project, index) in projects"
          :key="index"
        >
          <div>
            <strong>{{ project.title }}</strong>
            <p>{{ project.description.slice(0, 100) }}...</p>
          </div>
          <div class="buttons">
            <button @click="editProject(project)">✏️ Редактировать</button>
            <button @click="deleteProject(index)">🗑️ Удалить</button>
          </div>
        </div>
      </div>
      <p v-else>Нет проектов</p>
    </section>

    <!-- Добавление проекта -->
    <section class="add-project">
      <h2>{{ editingIndex !== null ? 'Редактировать проект' : 'Добавить проект' }}</h2>

      <form @submit.prevent="saveProject">
        <input type="text" v-model="form.title" placeholder="Название проекта" required />
        <textarea v-model="form.description" placeholder="Описание проекта" required></textarea>

        <input type="file" multiple @change="handleImageUpload" />

        <button type="submit">
          {{ editingIndex !== null ? 'Сохранить изменения' : 'Добавить проект' }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([])

const form = ref({
  title: '',
  description: '',
  images: [],
})

const editingIndex = ref(null)

const saveProject = () => {
  if (editingIndex.value !== null) {
    projects.value[editingIndex.value] = { ...form.value }
    editingIndex.value = null
  } else {
    projects.value.push({ ...form.value })
  }

  form.value = {
    title: '',
    description: '',
    images: [],
  }
}

const editProject = (project) => {
  editingIndex.value = projects.value.indexOf(project)
  form.value = { ...project }
}

const deleteProject = (index) => {
  projects.value.splice(index, 1)
}

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  const urls = files.map(file => URL.createObjectURL(file))
  form.value.images = urls
}
</script>

<style scoped lang="scss">
.admin-dashboard {
  padding: 4rem 10vw;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  section {
    margin-bottom: 3rem;
  }

  .project-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: #fafafa;

    .buttons button {
      margin-left: 0.5rem;
      background: #e3e3e3;
      border: none;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: #d3d3d3;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='text'],
    textarea {
      padding: 0.7rem;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    input[type='file'] {
      margin-top: 0.5rem;
    }

    button[type='submit'] {
      align-self: flex-start;
      background-color: #d3a265;
      color: white;
      border: none;
      padding: 0.6rem 1.4rem;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #b78347;
      }
    }
  }
}
</style>
