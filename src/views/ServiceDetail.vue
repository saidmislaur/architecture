<template>
  <div class="service-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
         <RouterLink to="/">
            <div class="nav__logo">
              <h1>ARCH STUDIO</h1>
            </div>
        </RouterLink>
          <button @click="goBack" class="back-link">
            ← Назад к услугам
          </button>
        </div>
      </div>
    </header>

    <!-- Breadcrumbs -->
    <div class="container">
      <nav class="breadcrumbs">
        <span>Услуги /</span>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Service Title -->
        <section class="service-hero">
          <h2 class="service-title">{{ serviceData.title }}</h2>
          <p class="service-subtitle">{{ serviceData.subtitle }}</p>
        </section>

        <!-- Service Description -->
        <section class="service-description">
          <div class="description-grid">
            <div class="description-main">
              <p class="lead-text">{{ serviceData.leadText }}</p>
              
              <div class="description-blocks">
                <div 
                  v-for="(block, index) in serviceData.description" 
                  :key="index" 
                  class="description-block"
                >
                  <h3>{{ block.title }}</h3>
                  <p>{{ block.content }}</p>
                  <ul v-if="block.list" class="service-list">
                    <li v-for="item in block.list" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="service-info">
              <div class="info-card">
                <div class="info-item">
                  <span class="info-label">Длительность</span>
                  <span class="info-value">{{ serviceData.duration }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Категория</span>
                  <span class="info-value">{{ serviceData.category }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Формат</span>
                  <span class="info-value">{{ serviceData.format }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Process Steps -->
        <section class="process-section">
          <h3 class="section-title">Этапы работы</h3>
          <div class="process-grid">
            <div 
              v-for="(step, index) in serviceData.process" 
              :key="index"
              class="process-step"
            >
              <div class="step-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h3>Заинтересованы в подобной услуге?</h3>
          <p>Свяжитесь с нами, чтобы обсудить ваши идеи и возможности сотрудничества</p>
          <a :href="telegramLink" target="_blank" class="cta-button">
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const telegramLink = 'https://t.me/your_username'

const services = {
  architecture: {
    type: 'architecture',
    title: 'Архитектурное проектирование',
    subtitle: 'Создание уникальных архитектурных решений',
    category: 'Проектирование',
    duration: 'от 2-х недель',
    format: 'Индивидуально',
    leadText: 'Комплексный подход к созданию архитектурных проектов любой сложности. От концепции до реализации — каждый проект разрабатывается с учетом индивидуальных потребностей клиента и особенностей участка.',
    description: [
      {
        title: 'Что включает в себя услуга',
        content: 'Полный цикл архитектурного проектирования включает все необходимые этапы для создания качественного проекта:',
        list: [
          'Эскизное проектирование и концепция',
          'Рабочая документация',
          '3D визуализация проекта',
          'Инженерные решения',
          'Авторский надзор',
          'Согласование в государственных органах'
        ]
      },
      {
        title: 'Индивидуальный подход',
        content: 'Каждый проект уникален. Мы изучаем ваши потребности, образ жизни, предпочтения в стиле и функциональности. Результат — архитектурное решение, которое идеально подходит именно вам.'
      },
      {
        title: 'Современные технологии',
        content: 'Используем передовые CAD системы и BIM технологии для создания точных и детализированных проектов. Это позволяет минимизировать ошибки и оптимизировать процесс строительства.'
      }
    ],
    process: [
      {
        title: 'Техническое задание',
        description: 'Обсуждаем ваши потребности, бюджет, сроки и особые требования к проекту'
      },
      {
        title: 'Концепция и эскизы',
        description: 'Разрабатываем несколько вариантов концепции, выбираем оптимальное решение'
      },
      {
        title: 'Рабочий проект',
        description: 'Создаем детальную рабочую документацию со всеми необходимыми чертежами'
      },
      {
        title: 'Визуализация',
        description: 'Подготавливаем 3D визуализацию для лучшего понимания проекта'
      },
      {
        title: 'Сдача проекта',
        description: 'Передаем полный комплект документации и оказываем поддержку при реализации'
      }
    ]
  },
  consulting: {
    type: 'consulting',
    title: 'Консалтинг',
    subtitle: 'Экспертные консультации по архитектуре',
    category: 'Консультации',
    duration: 'от 1 часа',
    format: 'Онлайн/Офлайн',
    leadText: 'Профессиональные консультации по всем вопросам архитектуры и строительства. Помогаем принимать правильные решения на любом этапе вашего проекта — от выбора участка до финальной отделки.',
    description: [
      {
        title: 'Направления консультирования',
        content: 'Консультируем по широкому спектру вопросов в области архитектуры и строительства:',
        list: [
          'Выбор и анализ земельного участка',
          'Планировочные решения и зонирование',
          'Выбор строительных материалов',
          'Инженерные системы и коммуникации',
          'Экспертиза существующих проектов',
          'Оптимизация бюджета строительства'
        ]
      },
      {
        title: 'Формы консультирования',
        content: 'Консультации проводятся в удобном для вас формате — онлайн встречи, выезд на объект или встреча в офисе. Предоставляем письменные заключения и рекомендации по итогам консультации.'
      },
      {
        title: 'Экспертность',
        content: 'Многолетний опыт в архитектуре и строительстве позволяет нам давать практические рекомендации, основанные на реальном опыте реализации проектов различной сложности.'
      }
    ],
    process: [
      {
        title: 'Постановка задачи',
        description: 'Определяем круг вопросов, которые требуют экспертного мнения'
      },
      {
        title: 'Анализ ситуации',
        description: 'Изучаем предоставленные материалы, документы, планы или фотографии'
      },
      {
        title: 'Консультация',
        description: 'Проводим детальную консультацию в выбранном формате'
      },
      {
        title: 'Рекомендации',
        description: 'Предоставляем письменные рекомендации и план действий'
      },
      {
        title: 'Поддержка',
        description: 'Оказываем дальнейшую поддержку при реализации рекомендаций'
      }
    ]
  }
}

const serviceType = ref(route.params.type || 'architecture')
const serviceData = computed(() => services[serviceType.value] || services.architecture)

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.service-page {
  min-height: 100vh;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
}

.header {
  padding: 32px 0;
  border-bottom: 1px solid #f0f0f0;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
  }

  .logo {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #000;
    margin: 0;
  }

  .back-link {
    background: none;
    border: none;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #000;
    }
  }
}

.breadcrumbs {
  padding: 24px 0;
  font-size: 14px;
  color: #666;
}

.main-content {
  padding: 48px 0;

  @media (max-width: 768px) {
    padding: 32px 0;
  }
}

.service-hero {
  margin-bottom: 64px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }

  .service-title {
    font-size: 48px;
    font-weight: 300;
    color: #000;
    margin: 0 0 16px 0;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  .service-subtitle {
    font-size: 18px;
    color: #666;
    margin: 0;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

.service-description {
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 64px;
  }

  .description-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 80px;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }

  .description-main {
    .lead-text {
      font-size: 20px;
      line-height: 1.6;
      color: #333;
      margin: 0 0 48px 0;
      font-weight: 400;

      @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 32px;
      }
    }

    .description-blocks {
      .description-block {
        margin-bottom: 48px;

        &:last-child {
          margin-bottom: 0;
        }

        h3 {
          font-size: 24px;
          font-weight: 500;
          color: #000;
          margin: 0 0 16px 0;

          @media (max-width: 768px) {
            font-size: 20px;
          }
        }

        p {
          font-size: 16px;
          line-height: 1.7;
          color: #666;
          margin: 0 0 16px 0;
        }

        .service-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;

            &:before {
              content: '—';
              position: absolute;
              left: 0;
              color: #000;
            }
          }
        }
      }
    }
  }

  .service-info {
    .info-card {
      background: #fafafa;
      padding: 32px;
      border-radius: 0;

      @media (max-width: 768px) {
        padding: 24px;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .info-value {
          font-size: 14px;
          color: #000;
          font-weight: 500;
        }
      }
    }
  }
}

.process-section {
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 64px;
  }

  .section-title {
    font-size: 32px;
    font-weight: 300;
    color: #000;
    margin: 0 0 48px 0;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 32px;
    }
  }

  .process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  .process-step {
    .step-number {
      font-size: 14px;
      color: #666;
      font-weight: 500;
      margin-bottom: 16px;
      letter-spacing: 1px;
    }

    .step-content {
      h4 {
        font-size: 18px;
        font-weight: 500;
        color: #000;
        margin: 0 0 12px 0;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        color: #666;
        margin: 0;
      }
    }
  }
}

.cta-section {
  background: #2a2a2a;
  padding: 80px 0;

  @media (max-width: 768px) {
    padding: 64px 0;
  }

  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;

    h3 {
      font-size: 32px;
      font-weight: 300;
      color: #fff;
      margin: 0 0 16px 0;
      line-height: 1.3;

      @media (max-width: 768px) {
        font-size: 24px;
      }
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: #ccc;
      margin: 0 0 32px 0;
    }

    .cta-button {
      display: inline-block;
      background: #fff;
      color: #000;
      padding: 16px 32px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 1px;
      transition: all 0.2s ease;
      border: 2px solid #fff;

      &:hover {
        background: transparent;
        color: #fff;
      }

      @media (max-width: 768px) {
        padding: 14px 28px;
      }
    }
  }
}
</style>