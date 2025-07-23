<template>
  <div class="app">
    <Header />

    <MainSection />
    
    <PortfolioSection :projects="projects" :limit="3" :button="Button"/>

    <AboutSection />
    
    <Services />

    <ContactSection />

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import MainSection from '../components/MainSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'
import AboutSection from '../components/AboutSection.vue'
import Services from '../components/Services.vue'
import ContactSection from '../components/ContactSection.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import { API_URL } from '../api/config'

import axios from 'axios'

const projects = ref([])


const getProjects = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/projects`)
    console.log(res.data)
    projects.value = res.data
  } catch (err) {
    console.error('Ошибка при загрузке проектов:', err)
  }
}

onMounted(getProjects);
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #333;
}

.app {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 3rem;
  text-align: center;
}

@media (max-width: 768px) {
  .nav {
    &__menu {
      display: none;
    }

    &__toggle {
      display: flex;
    }
  }

  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;

    &__content {
      margin-bottom: 3rem;
    }
  }

  .about__content,
  .contact__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about__stats {
    justify-content: center;
  }

  .footer__content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .footer__links {
    order: -1;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .hero__title {
    font-size: 2rem;
  }

  .projects__grid,
  .services__grid {
    grid-template-columns: 1fr;
  }

  .about__stats {
    flex-direction: column;
    gap: 2rem;
  }
}

/* Styles for Projects Section */
.projects__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-between;
}

.projects__search {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #333;
  }
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &.active {
    background: #333;
    color: white;
    border-color: #333;
  }
}

.projects__sort {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.sort-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.view-toggle {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &.active {
    background: #333;
    color: white;
    border-color: #333;
  }
}

.search-results {
  margin-bottom: 1rem;
  font-style: italic;
  color: #666;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  transition: all 0.3s ease;

  &.gallery-view {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    .project-card {
      .project-card__content {
        display: none;
      }
    }
  }
}

.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  &__image {
    height: 250px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover &__image img {
    transform: scale(1.05);
  }

  &__content {
    padding: 1.5rem;
    position: relative;
  }

  &__year {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: #333;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    color: #666;
    font-size: 0.85rem;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  &__category {
    font-size: 1rem;
    font-weight: 500;
  }

  &__tags {
    display: flex;
    gap: 0.5rem;
  }
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #666;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.reset-btn {
  background: #333;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #555;
  }
}

/* Styles for Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;

  &__content {
    background: white;
    border-radius: 8px;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1;
  }

  &__gallery {
    position: relative;
  }

  &__info {
    padding: 2rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  &__year {
    background: #333;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__description {
    line-height: 1.7;
    color: #555;
    margin-bottom: 1.5rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.gallery__main {
  position: relative;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
  }
}

.gallery__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &--prev {
    left: 1rem;
  }

  &--next {
    right: 1rem;
  }
}

.gallery__thumbs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;

  img {
    width: 80px;
    height: 60px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover, &.active {
      opacity: 1;
    }
  }
}

.meta-item {
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #777;
    margin-bottom: 0.2rem;
  }

  span {
    font-size: 1rem;
    color: #333;
  }
}

/* Transitions */
.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}

.project-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
