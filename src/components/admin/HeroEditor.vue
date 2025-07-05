<template>
  <div class="admin-section">
    <h2>Фон главной страницы</h2>
    <form @submit.prevent="uploadImage">
      <input type="file" @change="onFileChange" accept="image/*" required />
      <button type="submit">Загрузить</button>
    </form>

    <div v-if="previewUrl" class="preview">
      <h4>Превью:</h4>
      <img :src="previewUrl" alt="Hero Image" style="max-width: 100%; max-height: 300px;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const selectedFile = ref(null)
const previewUrl = ref('')

const onFileChange = (e) => {
  selectedFile.value = e.target.files[0]
  previewUrl.value = URL.createObjectURL(selectedFile.value)
}

const uploadImage = async () => {
  const formData = new FormData()
  formData.append('image', selectedFile.value)

  try {
    const res = await axios.post('http://localhost:5000/api/hero/upload-hero', formData)
    const imageUrl = res.data.imageUrl

    await axios.post('http://localhost:5000/api/settings/hero-image', { imageUrl })
    alert('Фон успешно обновлён')
  } catch (err) {
    console.error('Ошибка загрузки', err)
    alert('Ошибка')
  }
}

</script>
