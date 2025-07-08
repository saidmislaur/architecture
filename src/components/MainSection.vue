<template>
   <section class="hero">
      <div class="hero__content">
        <h2 class="hero__title">Создаем пространства<br>будущего</h2>
        <p class="hero__subtitle">Современная архитектура с акцентом на функциональность и эстетику</p>
        <button class="hero__cta">Наши проекты</button>
      </div>
      <div class="hero__image">
        <img src="https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg" alt="Архитектурный проект" />
      </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const heroImage = ref('')

// onMounted(async () => {
//   try {
//     const res = await axios.get('http://localhost:5000/api/settings')
//     heroImage.value = res.data.heroImage || '/uploads/default.jpg'
//     console.log(heroImage.value)
//   } catch (err) {
//     console.error('Ошибка загрузки фона', err)
//     heroImage.value = '/uploads/default.jpg'
//   }
// })

</script>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 0 2rem;
  margin-top: 80px;

  &__content {
    flex: 1;
    max-width: 600px;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  &__cta {
    background: #333;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #555;
    }
  }

  &__image {
    flex: 1;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
