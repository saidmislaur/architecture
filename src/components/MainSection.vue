<template>
   <section class="main">
    <div class="main__container">
      <div class="main__content">
        <h2 class="main__title">Создаем пространства<br>будущего</h2>
        <p class="main__subtitle">Современная архитектура с акцентом на функциональность и эстетику</p>
        <RouterLink to="/projects">
          <Button value="Наши проекты"/>
        </RouterLink>
      </div>
      <Swiper :navigation="true" :modules="modules" class="mySwiper main__image">
          <SwiperSlide v-for="(item, index) in projects" :key="index">
            <RouterLink :to="`/projects/${item._id}`">
               <img 
                :src="getImageUrl(item.photos[0]?.image)" 
                :alt="item.title" 
            />
            </RouterLink>
          </SwiperSlide>
        </Swiper>
    </div>
    </section>
</template>

<script setup>
import Button from './Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import { API_URL } from '../api/config'

const props = defineProps({
  projects: Array,
})

const modules = [Navigation]

const getImageUrl = (path) => {
  if (!path) return 'https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg'
  if (path.startsWith('http')) return path
  return `${API_URL}${path}`
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 0 2rem;
  margin-top: 80px;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
  }

  &__content {
    flex: 1;
    max-width: 450px;
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
    margin-right: 15px;
  }
  &__image {
    flex: 1;
    text-align: center;
    height: 675px;

    img {
      width: 900px;
      height: 600px;
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
