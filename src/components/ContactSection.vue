<template>
  <section id="contact" class="contact">
      <div class="container">
        <div class="contact__content">
          <div class="contact__info">
            <h2 class="section-title">Свяжитесь с нами</h2>
            <p>Готовы обсудить ваш проект? Мы всегда открыты для новых идей и сотрудничества.</p>
            <div class="contact__details">
              <div class="contact__item">
                <strong>Телефон:</strong>
                <span>{{phone}}</span>
              </div>
              <div class="contact__item">
                <strong>Email:</strong>
                <span>{{ emailInfo }}</span>
              </div>
              <div class="contact__item">
                <strong>Адрес:</strong>
                <span>{{ address }}</span>
              </div>
            </div>
          </div>
          <form class="contact__form" @submit.prevent="submitForm">
            <div class="form-group">
              <input v-model="form.name" type="text" placeholder="Ваше имя" required />
            </div>
            <div class="form-group">
              <input v-model="form.email" type="email" placeholder="Email" required />
            </div>
            <div class="form-group">
              <textarea v-model="form.message" placeholder="Сообщение" rows="5" required></textarea>
            </div>
            <button type="submit" class="form-submit">Отправить</button>
          </form>
        </div>
      </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const message = ref('')

const address = ref('')
const emailInfo = ref('')
const phone = ref('')

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('📨 Отправка формы:', {
    name: name.value,
    email: email.value,
    message: message.value
  })

  // Очистка
  name.value = ''
  email.value = ''
  message.value = ''

  alert('Спасибо за сообщение!')
}

 const getContactInfo = async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact")
      console.log()
      address.value = res.data.address;
      emailInfo.value = res.data.email;
      phone.value = res.data.phone;
    } catch (error) {
      console.error('Ошибка загрузки данных', err)
    }
  }
onMounted(getContactInfo);
</script>

<style scoped lang="scss">
.contact {
  padding: 5rem 0;

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }

  &__info {
    .section-title {
      text-align: left;
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.8;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      color: #333;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    span {
      color: #666;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.form-group {
  input, textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #333;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.form-submit {
  background: #333;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #555;
  }
}
</style>
