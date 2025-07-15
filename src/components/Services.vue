<template>
    <section id="services" class="services">
      <div class="container">
        <h2 class="section-title">Услуги</h2>
        <div class="services__grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="service-card__icon">
              <component :is="service.icon" />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';

const services = ref([
  {
    id: 1,
    title: 'Архитектурное проектирование',
    description: 'Полный цикл архитектурного проектирования от концепции до рабочих чертежей.',
    icon: 'BuildingIcon'
  },
  {
    id: 4,
    title: 'Консалтинг',
    description: 'Экспертные консультации по архитектурным и строительным вопросам.',
    icon: 'LightbulbIcon'
  }
])
</script>

<style scoped lang="scss">
.services {
  padding: 5rem 0;
  background: #f8f9fa;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &__icon {
    width: 60px;
    height: 60px;
    background: #333;
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
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

</style>