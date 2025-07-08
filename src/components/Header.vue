<template>
  <header class="header">
      <nav class="nav">
        <div class="nav__logo">
          <h1>ARCH STUDIO</h1>
        </div>
        <ul class="nav__menu">
          <li><a href="#projects" @click="activeSection = 'projects'">Проекты</a></li>
          <li><a href="#about" @click="activeSection = 'about'">О нас</a></li>
          <li><a href="#services" @click="activeSection = 'services'">Услуги</a></li>
          <li><a href="#contact" @click="activeSection = 'contact'">Контакты</a></li>
        </ul>
        <button class="nav__toggle" @click="menuOpen = !menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  <!-- <header class="header">
    <h1 class="logo">Architecture</h1>
    <nav class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">О нас</RouterLink>
      <RouterLink to="/projects">Проекты</RouterLink>
      <RouterLink to="/team">Команда</RouterLink>
      <RouterLink to="/contact">Контакты</RouterLink>
    </nav>
  </header> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeSection = ref('projects')
const menuOpen = ref(false)
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid #eee;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  &__logo h1 {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 2px;
  }

  &__menu {
    display: flex;
    list-style: none;
    gap: 2rem;

    a {
      text-decoration: none;
      color: #333;
      font-weight: 400;
      transition: color 0.3s ease;

      &:hover {
        color: #666;
      }
    }
  }

  &__toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;

    span {
      width: 25px;
      height: 2px;
      background: #333;
      margin: 3px 0;
      transition: 0.3s;
    }
  }
}
</style>
