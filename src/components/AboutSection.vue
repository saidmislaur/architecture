<template>
     <section id="about" class="about">
      <div class="container">
        <div class="about__content">
          <div class="about__text">
            <h2 class="section-title">О студии</h2>
            <p>Мы создаем архитектурные решения, которые объединяют функциональность, эстетику и устойчивость. Наша команда профессионалов работает над проектами любой сложности — от частных резиденций до крупных коммерческих объектов.</p>
            <div class="about__stats">
              <div class="stat">
                <span class="stat__number">{{ stats.projects }}</span>
                <span class="stat__label">Проектов</span>
              </div>
              <div class="stat">
                <span class="stat__number">{{ stats.years }}</span>
                <span class="stat__label">Лет опыта</span>
              </div>
              <div class="stat">
                <span class="stat__number">{{ stats.awards }}</span>
                <span class="stat__label">Наград</span>
              </div>
            </div>
          </div>
          <div class="about__image">
            <img src="https://s0.rbk.ru/v6_top_pics/media/img/2/24/347126512643242.jpeg" alt="Команда студии" />
          </div>
        </div>
      </div>
    </section>
</template>
<script setup>
import { reactive, onMounted } from 'vue'

const stats = reactive({
  projects: 0,
  years: 0,
  awards: 0
})

const animateStats = () => {
  const targets = { projects: 150, years: 12, awards: 25 }
  const duration = 2000
  const steps = 60
  const stepTime = duration / steps

  Object.keys(targets).forEach(key => {
    const target = targets[key]
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        stats[key] = target
        clearInterval(timer)
      } else {
        stats[key] = Math.floor(current)
      }
    }, stepTime)
  })
}
onMounted(animateStats)
</script>
<style scoped lang="scss">
.about {
  padding: 5rem 0;

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  &__text {
    .section-title {
      text-align: left;
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 3rem;
      line-height: 1.8;
    }
  }

  &__stats {
    display: flex;
    gap: 3rem;
  }

  &__image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
}

.stat {
  text-align: center;

  &__number {
    display: block;
    font-size: 2.5rem;
    font-weight: 300;
    color: #333;
  }

  &__label {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
