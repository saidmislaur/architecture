<template>
  <section class="project-details" v-if="project" data-aos="fade-up">
    <button class="back-btn" @click="goBack">← Назад к проектам</button>
    <h1 class="project-details__title">{{ project.title }}</h1>
    <p class="project-details__description">{{ project.description }}</p>
    <div class="gallery">
      <img
        v-for="(img, index) in project.images"
        :key="index"
        :src="img"
        :alt="`${project.title} изображение ${index + 1}`"
        class="gallery__image"
        data-aos="zoom-in"
        data-aos-delay="100"
        @click="openLightbox(img)"
      />
    </div>
  </section>
   <section v-else class="project-details__loading">
    <p>Загрузка проекта...</p>
  </section>

    <div v-if="lightboxImage" class="lightbox" @click.self="closeLightbox">
      <img :src="lightboxImage" class="lightbox__image"/>
      <button class="lightbox__close" @click="closeLightbox">×</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Пример данных, позже подгрузим с бэкенда
const projects = [
  {
    id: '1',
    title: 'Минималистичный дом в горах',
    description: 'Проект современного минималистичного дома с панорамными окнами и натуральными материалами.',
    images: [
      'https://cashpo-design.ru/userfiles/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8/style-ofic1.jpg',
    ],
  },
  {
    id: '2',
    title: 'Современный офис в городе',
    description: 'Проект офиса с открытым пространством и зелеными зонами для сотрудников.',
    images: [
      'https://mayalanya.ru/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-15-at-10.06.44-2.jpeg',
    ],
  },
  {
    id: '3',
    title: 'Жилой комплекс на побережье',
    description: 'Проект жилого комплекса с видом на море и развитой инфраструктурой.',
    images: [
      'https://ybis.ru/wp-content/uploads/2023/09/dolomitenhutte-osttirol-avstriia-4.webp',
    ],
  },
]

const route = useRoute()
const router = useRouter()
const project = ref(null)

const lightboxImage = ref(null)

const openLightbox = (img) => {
  lightboxImage.value = img
}

const closeLightbox = () => {
  lightboxImage.value = null
}


onMounted(() => {
  const id = route.params.id
  project.value = projects.find((p) => p.id === id)
  if (!project.value) {
    // Если проект не найден, редирект на главную
    router.push('/')
  }
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.project-details {
  padding: 4rem 10vw;

  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  &__description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    &__image {
      width: 100%;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .back-btn {
    margin-bottom: 2rem;
    background: none;
    border: none;
    color: #d3a265;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.85);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;

  &__image {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.6);
  }

  &__close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: transparent;
    border: none;
    font-size: 3rem;
    color: #fff;
    cursor: pointer;
  }
}

@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.85);
  }
}
</style>
