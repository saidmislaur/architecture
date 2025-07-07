<template>
  <section class="admin-posts">
    <div class="header">
      <h1>Посты</h1>
      <button @click="createPost">+ Новый пост</button>
    </div>

    <ul class="post-list">
      <li v-for="post in posts" :key="post._id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <div class="buttons">
          <button @click="editPost(post._id)">Редактировать</button>
          <button @click="deletePost(post._id)">Удалить</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const posts = ref([])
const router = useRouter()

const getPosts = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/projects')
    posts.value = res.data.reverse()
  } catch (error) {
    console.error('Ошибка при получении постов:', error)
  }
}

const deletePost = async (id) => {
  if (confirm('Удалить пост?')) {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`)
      posts.value = posts.value.filter((post) => post._id !== id)
    } catch (error) {
      console.error('Ошибка при удалении:', error)
    }
  }
}

const editPost = (id) => {
  router.push(`/admin/posts/edit/${id}`)
}

const createPost = () => {
  router.push('/admin/posts/new')
}

onMounted(getPosts)
</script>

<style scoped>
.admin-posts {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-list {
  list-style: none;
  padding: 0;
}
.post-item {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}
.buttons button {
  margin-right: 0.5rem;
}
</style>
