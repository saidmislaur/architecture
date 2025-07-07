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
        <RouterLink :to="{ name: 'project-details', params: { id: project._id } }" class="project-card__link">
          <ProjectCard :image="project.images" :title="project.title" :description="project.description"/>
        </RouterLink>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import axios from 'axios'

import ProjectCard from './ProjectCard.vue';
const modules = [Navigation, Pagination]


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

const projects = ref([]);

const getProjects = async () => {
  try {
  const res = await axios.get('http://localhost:5000/api/projects?limit=6&sort=desc')
    console.log(res.data)
    projects.value = res.data;
  } catch (err) {
    console.error('Ошибка при загрузке проекта:', err)
  }
}

onMounted(getProjects);
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
    transition: 0.3s ease;
    cursor: pointer;

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
    &:hover {
    transform: translateY(-5px);
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
.swiper-pagination {
  position: relative; /* или absolute, если надо */
  text-align: center;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: rgba(0,0,0,0.2);
  opacity: 1;
  border-radius: 50%;
  margin: 0 6px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.swiper-pagination-bullet:hover {
  background-color: rgba(0,0,0,0.4);
}

.swiper-pagination-bullet-active {
  background-color: #333;
  transform: scale(1.3);
}
</style>
