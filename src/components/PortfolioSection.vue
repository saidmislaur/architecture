<template>
  <section class="portfolio" id="portfolio">
    <h2 class="portfolio__title">Наши проекты</h2>

    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :breakpoints="breakpoints"
      navigation
      pagination
      class="portfolio__swiper"
    >
      <SwiperSlide v-for="(project, index) in projects" :key="index">
        <div class="portfolio__slide">
          <img :src="project.image" :alt="project.title" />
          <div class="portfolio__caption">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
const modules = [Navigation, Pagination]

const projects = [
  {
    title: 'Жилой комплекс на берегу',
    description: 'Современная архитектура с видом на озеро',
    image: 'https://cashpo-design.ru/userfiles/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8/style-ofic1.jpg'
  },
  {
    title: 'Минималистичный дом',
    description: 'Чистые линии и натуральные материалы',
    image: 'https://mayalanya.ru/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-15-at-10.06.44-2.jpeg'
  },
  {
    title: 'Офисное пространство',
    description: 'Функциональность и стиль',
    image: 'https://ybis.ru/wp-content/uploads/2023/09/dolomitenhutte-osttirol-avstriia-4.webp'
  },
  {
    title: 'Жилой комплекс на берегу',
    description: 'Современная архитектура с видом на озеро',
    image: 'https://cashpo-design.ru/userfiles/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8/style-ofic1.jpg'
  },
]

const breakpoints = {
  640: {
    slidesPerView: 1
  },
  768: {
    slidesPerView: 2
  },
  1024: {
    slidesPerView: 3
  }
}
</script>

<style scoped lang="scss">
.portfolio {
  padding: 6rem 10vw;
  background-color: #fff;
  text-align: center;

  &__title {
    font-size: 2rem;
    margin-bottom: 3rem;
    color: #1a1a1a;
  }

  &__swiper {
    width: 100%;
  }

  &__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f6f6f6;
    border-radius: 10px;
    overflow: hidden;
    height: 500px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__caption {
      margin-top: 1rem;
      h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
      p {
        color: #555;
        font-size: 0.95rem;
      }
    }
  }
}
.custom-nav {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(4px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: solid #333;
    border-width: 0 2px 2px 0;
    padding: 4px;
    transform: rotate(45deg);
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &.swiper-button-prev::after {
    transform: translate(-50%, -50%) rotate(225deg);
  }

  &.swiper-button-next {
    right: 0;
  }

  &.swiper-button-prev {
    left: 0;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
