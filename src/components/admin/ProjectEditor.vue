<template>
  <section class="edit-post">
    <h1>{{ isEdit ? 'Редактировать пост' : 'Новый пост' }}</h1>

    <form @submit.prevent="savePost">
      <div>
        <label>Заголовок</label>
        <input v-model="post.title" required />
      </div>

      <div>
        <label>Описание</label>
        <textarea v-model="post.description" rows="5" required></textarea>
      </div>

      <div>
        <label>Картинки</label>
        <input type="file" multiple @change="handleImageChange" />
        <div class="preview">
          <img
            v-for="(img, index) in post.images"
            :key="index"
            :src="img"
            alt="Preview"
            style="max-width: 100px; margin-right: 10px"
          />
        </div>
      </div>

      <button type="submit">Сохранить</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const isEdit = route.params.id !== 'new'

const post = ref({
  title: '',
  description: '',
  images: [],
})

const fetchPost = async () => {
  if (isEdit) {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${route.params.id}`)
      post.value = res.data
    } catch (error) {
      console.error('Ошибка при загрузке поста:', error)
    }
  }
}

const savePost = async () => {
  try {
    if (isEdit) {
      await axios.put(`http://localhost:5000/api/projects/${route.params.id}`, post.value)
    } else {
      await axios.post('http://localhost:5000/api/projects', post.value)
    }
    router.push('/admin/projects')
  } catch (error) {
    console.error('Ошибка при сохранении:', error)
  }
}

const handleImageChange = (event) => {
  const files = event.target.files
  post.value.images = Array.from(files).map((file) => URL.createObjectURL(file))
  // Пример — если нужно загружать на сервер, подключи upload через FormData
}

onMounted(fetchPost)
</script>


<style scoped>
.edit-post {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
.edit-post form div {
  margin-bottom: 1rem;
}
</style>
