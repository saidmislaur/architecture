<template>
  <section class="hero" :style="{ backgroundImage: `url(http://localhost:5000${heroImage})` }">
    <div class="hero__content">
      <h1 class="hero__title">Создаем архитектуру будущего</h1>
      <p class="hero__subtitle">
        Эстетика, функциональность и минимализм в каждом проекте.
      </p>
      <RouterLink to="/projects" class="hero__btn">Смотреть проекты</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const heroImage = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/settings')
    heroImage.value = res.data.heroImage || '/uploads/default.jpg'
    console.log(heroImage.value)
  } catch (err) {
    console.error('Ошибка загрузки фона', err)
    heroImage.value = '/uploads/default.jpg'
  }
})

</script>

<style scoped lang="scss">
.hero {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  padding: 0 10vw;
  position: relative;
  overflow: hidden;

  &__content {
    max-width: 700px;
    animation: fadeInUp 1s ease forwards;
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #e1e1e1;
  }

  &__subtitle {
    font-size: 1.25rem;
    color: #b5b5b5;
    margin-bottom: 2rem;
    max-width: 500px;
  }

  &__btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #d3a265;
    color: white;
    font-weight: 500;
    text-decoration: none;
    transition: 0.3s;
    border-radius: 4px;

    &:hover {
      background-color: darken(#d3a265, 10%);
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
