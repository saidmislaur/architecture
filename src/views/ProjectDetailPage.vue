<template>
  <div class="project-detail">
    <!-- Header -->
    <header class="header">
      <nav class="nav">
        <div class="nav__logo">
          <h1>ARCH STUDIO</h1>
        </div>
        <div class="nav__back">
          <button @click="goBack" class="back-btn">
            ← Назад к проектам
          </button>
        </div>
      </nav>
    </header>

    <!-- Project Hero -->
    <section class="project-hero">
      <div class="container">
        <div class="project-hero__content">
          <div class="project-hero__breadcrumb">
            <span>Проекты</span>
            <span>/</span>
            <span>{{ project.category }}</span>
            <span>/</span>
            <span>{{ project.title }}</span>
          </div>
          
          <h1 class="project-hero__title">{{ project.title }}</h1>
        </div>
      </div>
    </section>

    <!-- Project Photos -->
    <section class="project-photos">
      <div class="container">
        <div class="photos-grid">
          <div 
            v-for="(photo, index) in project.photos" 
            :key="index"
            :class="['photo-item', `photo-item--${photo.layout}`]"
          >
            <div class="photo-item__image">
              <img 
                :src="photo.image" 
                :alt="photo.title || `${project.title} - фото ${index + 1}`"
                @click="openLightbox(index, 'photos')"
              />
            </div>
            
            <div v-if="photo.description" class="photo-item__description">
              <p>{{ photo.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Location -->
    <section class="project-location">
      <div class="container">
        <h2 class="section-title">Локация проекта</h2>
        <div class="location-content">
          <div class="location-info">
            <div class="location-item">
              <strong>Адрес:</strong>
              <span>{{ project.location.address }}</span>
            </div>
            <div class="location-item">
              <strong>Район:</strong>
              <span>{{ project.location.district }}</span>
            </div>
            <div class="location-item">
              <strong>Город:</strong>
              <span>{{ project.location.city }}</span>
            </div>
            <div class="location-item">
              <strong>Площадь участка:</strong>
              <span>{{ project.location.plotArea }}</span>
            </div>
          </div>
          <div class="location-map">
            <img :src="project.location.mapImage" alt="Карта локации" />
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="key-features">
      <div class="container">
        <h2 class="section-title">Ключевые особенности проекта</h2>
        <div class="features-grid">
          <div 
            v-for="feature in project.keyFeatures" 
            :key="feature.title"
            class="feature-card"
          >
            <div class="feature-card__icon">
              <span>{{ feature.icon }}</span>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Gallery -->
    <section class="project-gallery">
      <div class="container">
        <h2 class="section-title">Галерея проекта</h2>
        
        <div class="gallery-grid">
          <div 
            v-for="(item, index) in project.galleryItems" 
            :key="index"
            :class="['gallery-item', `gallery-item--${item.layout}`]"
          >
            <div class="gallery-item__image">
              <img 
                :src="item.image" 
                :alt="item.title || `${project.title} - изображение ${index + 1}`"
                @click="openLightbox(index)"
              />
            </div>
            
            <div v-if="item.title || item.description" class="gallery-item__content">
              <h3 v-if="item.title">{{ item.title }}</h3>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Projects -->
    <section class="related-projects">
      <div class="container">
        <h2 class="section-title">Похожие проекты</h2>
        
        <div class="related-grid">
          <div 
            v-for="relatedProject in relatedProjects" 
            :key="relatedProject.id"
            class="related-card"
            @click="loadProject(relatedProject)"
          >
            <div class="related-card__image">
              <img :src="relatedProject.image" :alt="relatedProject.title" />
            </div>
            <div class="related-card__content">
              <h4>{{ relatedProject.title }}</h4>
              <p>{{ relatedProject.type }}</p>
              <span class="related-card__year">{{ relatedProject.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="project-cta">
      <div class="container">
        <div class="cta-content">
          <h2>Заинтересованы в подобном проекте?</h2>
          <p>Свяжитесь с нами, чтобы обсудить ваши идеи и возможности сотрудничества</p>
          <button class="cta-btn">Связаться с нами</button>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox__content" @click.stop>
        <button class="lightbox__close" @click="closeLightbox">&times;</button>
        
        <div class="lightbox__image">
          <img 
            :src="currentLightboxSection === 'photos' ? project.photos[currentLightboxIndex].image : project.galleryItems[currentLightboxIndex].image"
            :alt="currentLightboxSection === 'photos' ? project.photos[currentLightboxIndex].title || project.title : project.galleryItems[currentLightboxIndex].title || project.title"
          />
        </div>
        
        <div class="lightbox__info">
          <h3 v-if="currentLightboxSection === 'photos' ? project.photos[currentLightboxIndex].title : project.galleryItems[currentLightboxIndex].title">
            {{ currentLightboxSection === 'photos' ? project.photos[currentLightboxIndex].title : project.galleryItems[currentLightboxIndex].title }}
          </h3>
          <p v-if="currentLightboxSection === 'photos' ? project.photos[currentLightboxIndex].description : project.galleryItems[currentLightboxIndex].description">
            {{ currentLightboxSection === 'photos' ? project.photos[currentLightboxIndex].description : project.galleryItems[currentLightboxIndex].description }}
          </p>
        </div>
        
        <button 
          v-if="(currentLightboxSection === 'photos' ? project.photos.length : project.galleryItems.length) > 1"
          @click="prevLightboxImage" 
          class="lightbox__nav lightbox__nav--prev"
        >
          ‹
        </button>
        <button 
          v-if="(currentLightboxSection === 'photos' ? project.photos.length : project.galleryItems.length) > 1"
          @click="nextLightboxImage" 
          class="lightbox__nav lightbox__nav--next"
        >
          ›
        </button>
        
        <div class="lightbox__counter">
          {{ currentLightboxIndex + 1 }} / {{ (currentLightboxSection === 'photos' ? project.photos.length : project.galleryItems.length) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'ProjectDetail',
  setup() {
    const lightboxOpen = ref(false)
    const currentLightboxIndex = ref(0)
    const currentLightboxSection = ref('gallery')
    
    const project = reactive({
      id: 1,
      title: 'Современный дом в стиле минимализм',
      type: 'Жилая архитектура',
      category: 'residential',
      photos: [
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          layout: 'large',
          description: 'Главный фасад дома с панорамными окнами и террасой. Использование натурального камня и дерева создает теплую и современную атмосферу.'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          layout: 'medium',
          description: 'Открытое пространство гостиной с камином и выходом на террасу.'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          layout: 'medium',
          description: 'Современная кухня с островом и встроенной техникой.'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          layout: 'large'
        }
      ],
      location: {
        address: 'ул. Рублевская, 45',
        district: 'Рублевка',
        city: 'Москва',
        plotArea: '2000 м²',
        mapImage: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
      },
      keyFeatures: [
        {
          icon: '🏠',
          title: 'Минималистичный дизайн',
          description: 'Чистые линии и открытые пространства создают ощущение простора и света'
        },
        {
          icon: '🌿',
          title: 'Экологичность',
          description: 'Использование натуральных материалов и энергоэффективных решений'
        },
        {
          icon: '💡',
          title: 'Умный дом',
          description: 'Интегрированная система автоматизации освещения, климата и безопасности'
        },
        {
          icon: '🪟',
          title: 'Панорамные окна',
          description: 'Окна от пола до потолка обеспечивают максимальное естественное освещение'
        }
      ],
      galleryItems: [
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          title: 'Спальня'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          title: 'Ванная комната'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          title: 'Рабочий кабинет'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          title: 'Терраса и сад'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          title: 'Ночная подсветка'
        },
        {
          image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg',
          title: 'Внутренний двор'
        }
      ]
    })

    const relatedProjects = ref([
      {
        id: 2,
        title: 'Частная вилла',
        type: 'Жилая архитектура',
        year: '2023',
        image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
      },
      {
        id: 3,
        title: 'Эко-дом',
        type: 'Жилая архитектура',
        year: '2024',
        image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
      },
      {
        id: 4,
        title: 'Загородный дом',
        type: 'Жилая архитектура',
        year: '2022',
        image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
      }
    ])

    const openLightbox = (index, section = 'gallery') => {
      if (section === 'photos') {
        // Открыть лайтбокс для фотографий проекта
        currentLightboxIndex.value = index
        currentLightboxSection.value = 'photos'
      } else {
        // Открыть лайтбокс для галереи
        currentLightboxIndex.value = index
        currentLightboxSection.value = 'gallery'
      }
      lightboxOpen.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
      lightboxOpen.value = false
      document.body.style.overflow = 'auto'
    }

    const nextLightboxImage = () => {
      currentLightboxIndex.value = (currentLightboxIndex.value + 1) % (currentLightboxSection.value === 'photos' ? project.photos.length : project.galleryItems.length)
    }

    const prevLightboxImage = () => {
      currentLightboxIndex.value = currentLightboxIndex.value === 0 
        ? (currentLightboxSection.value === 'photos' ? project.photos.length : project.galleryItems.length) - 1 
        : currentLightboxIndex.value - 1
    }

    const goBack = () => {
      // В реальном приложении здесь был бы роутер
      window.history.back()
    }

    const loadProject = (newProject) => {
      // В реальном приложении здесь была бы загрузка нового проекта
      console.log('Loading project:', newProject.title)
    }

    // Обработка клавиш для лайтбокса
    const handleKeydown = (event) => {
      if (!lightboxOpen.value) return
      
      switch (event.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevLightboxImage()
          break
        case 'ArrowRight':
          nextLightboxImage()
          break
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    return {
      project,
      relatedProjects,
      lightboxOpen,
      currentLightboxIndex,
      currentLightboxSection,
      openLightbox,
      closeLightbox,
      nextLightboxImage,
      prevLightboxImage,
      goBack,
      loadProject
    }
  }
}
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Header
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
}

.back-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  text-decoration: none;

  &:hover {
    background: #f5f5f5;
    border-color: #333;
  }
}

// Project Hero
.project-hero {
  padding: 8rem 0 4rem;
  background: #f8f9fa;

  &__breadcrumb {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #666;
    font-size: 0.9rem;

    span:not(:last-child) {
      &::after {
        content: '';
        margin-left: 0.5rem;
      }
    }
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 2rem;
  }

  &__meta {
    margin-bottom: 2rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #777;
    letter-spacing: 1px;
  }

  span {
    font-size: 1rem;
    color: #333;
  }
}

.tag {
  background: #333;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

// Project Photos
.project-photos {
  padding: 4rem 0;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  auto-rows: 300px;
}

.photo-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--large {
    grid-column: span 12;
    grid-row: span 2;
  }

  &--medium {
    grid-column: span 6;
    grid-row: span 1;
  }

  &--small {
    grid-column: span 4;
    grid-row: span 1;
  }

  &__image {
    flex: 1;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  &__description {
    p {
      color: #666;
      line-height: 1.6;
      font-style: italic;
    }
  }
}

// Project Location
.project-location {
  padding: 4rem 0;
  background: #f8f9fa;
}

.location-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.location-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: #777;
    letter-spacing: 1px;
  }

  span {
    font-size: 1.1rem;
    color: #333;
  }
}

.location-map {
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
}

// Key Features
.key-features {
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &__icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

// Project Gallery
.project-gallery {
  padding: 4rem 0;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 3rem;
  text-align: center;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  auto-rows: 300px;
}

.gallery-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  &--large {
    grid-column: span 8;
    grid-row: span 2;
  }

  &--medium {
    grid-column: span 6;
    grid-row: span 1;
  }

  &--small {
    grid-column: span 4;
    grid-row: span 1;
  }

  &__image {
    flex: 1;
    overflow: hidden;

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
    background: white;

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

// Project Details
.project-details {
  padding: 4rem 0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
}

.details-section {
  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: #555;
    line-height: 1.7;
  }

  ul {
    list-style: none;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: #555;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #333;
        font-weight: bold;
      }
    }
  }
}

// Related Projects
.related-projects {
  padding: 4rem 0;
  background: #f8f9fa;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.related-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  &__image {
    height: 200px;
    overflow: hidden;

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

    h4 {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }
  }

  &__year {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: #333;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
  }
}

// Project CTA
.project-cta {
  padding: 4rem 0;
  background: #333;
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
}

.cta-btn {
  background: white;
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }
}

// Lightbox
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 2rem;
}

.lightbox__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.lightbox__close {
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
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
}

.lightbox__image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
  }
}

.lightbox__info {
  padding: 2rem;
  background: white;
  border-top: 1px solid #eee;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
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

.lightbox__counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

// Responsive Design
@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .meta-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    auto-rows: 250px;

    .gallery-item {
      &--large,
      &--medium,
      &--small {
        grid-column: span 1;
        grid-row: span 1;
      }
    }
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .project-hero__title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .lightbox__content {
    margin: 1rem;
  }

  .lightbox__nav {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .nav {
    padding: 1rem 15px;
    flex-direction: column;
    gap: 1rem;
  }

  .project-hero {
    padding: 6rem 0 2rem;
  }

  .gallery-item__content {
    padding: 1rem;
  }

  .lightbox__info {
    padding: 1rem;
  }
}
</style>
