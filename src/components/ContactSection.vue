<template>
  <section class="contact" id="contact">
    <div class="contact__info" data-aos="fade-up">
      <h2 class="contact__title">Свяжитесь с нами</h2>
      <p class="contact__text">
        Если у вас есть идеи или проект — напишите нам. Мы с радостью ответим!
      </p>
      <ul class="contact__details">
        <li><strong>Адрес:</strong> {{address}} </li>
        <li><strong>Email:</strong> {{ emailInfo }}</li>
        <li><strong>Телефон:</strong> {{ phone }}</li>
      </ul>
    </div>

    <form class="contact__form" @submit.prevent="handleSubmit" data-aos="fade-up" data-aos-delay="200">
      <input type="text" placeholder="Ваше имя" v-model="name" required />
      <input type="email" placeholder="Ваш email" v-model="email" required />
      <textarea placeholder="Сообщение..." v-model="message" required></textarea>
      <button type="submit">Отправить</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const message = ref('')

const address = ref('')
const emailInfo = ref('')
const phone = ref('')

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  padding: 6rem 10vw;
  background-color: #fdfdfd;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #1a1a1a;
  }

  &__text {
    font-size: 1.1rem;
    color: #555;
  }

  &__details {
    list-style: none;
    padding: 0;
    margin-top: 1rem;

    li {
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input,
    textarea {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    button {
      align-self: flex-start;
      padding: 0.75rem 1.5rem;
      background-color: #d3a265;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;

      &:hover {
        background-color: #b58a50;
      }
    }
  }
}
</style>
