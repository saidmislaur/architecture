<template>
  <section class="hero">
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
</script>

<style scoped lang="scss">
.hero {
  height: 100vh;
  background-color: #f5f5f5;
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
    color: #1a1a1a;
  }

  &__subtitle {
    font-size: 1.25rem;
    color: #666;
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
