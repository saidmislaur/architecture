<template>
  <header class="header">
    <h1 class="logo">Architecture</h1>
    <nav class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">О нас</RouterLink>
      <RouterLink to="/projects">Проекты</RouterLink>
      <RouterLink to="/team">Команда</RouterLink>
      <RouterLink to="/contact">Контакты</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e5e5;

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .nav {
    display: flex;
    gap: 1.5rem;

    a {
      font-size: 0.95rem;
      transition: 0.3s ease;

      &:hover {
        color: #d3a265;
      }
    }
  }
}
</style>
