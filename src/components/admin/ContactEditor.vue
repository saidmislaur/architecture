<template>
  <div class="admin-section">
    <h2>Контактная информация</h2>

    <form @submit.prevent="editContacts">
      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label>Телефон</label>
        <input v-model="form.phone" type="text" required />
      </div>

      <div class="form-group">
        <label>Адрес</label>
        <input v-model="form.address" type="text" required />
      </div>

      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  email: '',
  phone: '',
  address: '',
})

const getContacts = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/contact')
    if (res.data) {
        form.email = res.data.email || ''
        form.phone = res.data.phone || ''
        form.address = res.data.address || ''
    }
  } catch (err) {
    console.error('Ошибка загрузки контактов', err)
  }
}

const editContacts = async () => {
  try {
    await axios.post('http://localhost:5000/api/contact', form)
    alert('Контакты обновлены')
  } catch (err) {
    console.error('Ошибка сохранения', err)
    alert('Ошибка сохранения')
  }
}

onMounted(getContacts)
</script>

<style scoped lang="scss">
.admin-section {
  margin-top: 2rem;
}
.form-group {
  margin-bottom: 1rem;
  label {
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
}
button {
  padding: 0.6rem 1.2rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
}
</style>
