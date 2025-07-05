<template>
  <div class="admin-dashboard">
    <h1>Админ-панель</h1>

    <section class="admin-section">
      <HeroEditor />
    </section>

    <section class="admin-section">
      <h2>Проекты</h2>
        <div class="admin-section__projects">
            <ProjectCard 
                v-for="project in projects" 
                class="admin-section__project" 
                :image="project.image" 
                :title="project.title"
            />
        </div> 
        <div class="button-group">
            <button @click="goToAddProject">Добавить проект</button>
            <button @click="goToManageProjects">Управление проектами</button>
        </div>
    </section>

    <!-- 3. Контактная информация -->
    <section class="admin-section">
      <ContactEditor />
    </section>

    <!-- 4. Информация о компании -->
    <section class="admin-section">
      <h2>О компании</h2>
      <textarea v-model="aboutCompany" rows="6" placeholder="Введите информацию о компании..." />
      <button @click="saveAboutCompany">Сохранить</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue';
import ContactEditor from '../components/admin/ContactEditor.vue';
import HeroEditor from '../components/admin/HeroEditor.vue';


const projects = [
  {
    id: '1',
    title: 'Жилой комплекс на берегу',
    description: 'Современная архитектура с видом на озеро',
    image: 'https://cashpo-design.ru/userfiles/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8/style-ofic1.jpg'
  },
  {
    id: '2',
    title: 'Минималистичный дом',
    description: 'Чистые линии и натуральные материалы',
    image: 'https://mayalanya.ru/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-15-at-10.06.44-2.jpeg'
  },
  {
    id: '3',
    title: 'Офисное пространство',
    description: 'Функциональность и стиль',
    image: 'https://ybis.ru/wp-content/uploads/2023/09/dolomitenhutte-osttirol-avstriia-4.webp'
  },
  {
    id: '4',
    title: 'Жилой комплекс на берегу',
    description: 'Современная архитектура с видом на озеро',
    image: 'https://cashpo-design.ru/userfiles/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8/style-ofic1.jpg'
  },
]

const contacts = ref({
  email: '',
  phone: '',
  address: '',
})

const aboutCompany = ref('')

function onUploadHero(event) {
  const file = event.target.files[0]
  if (file) {
    console.log('Файл загружен:', file.name)
    // отправка на сервер
  }
}

function saveContacts() {
  console.log('Сохраняем контакты:', contacts.value)
  // отправка на сервер
}

function saveAboutCompany() {
  console.log('Сохраняем "О компании":', aboutCompany.value)
  // отправка на сервер
}

function goToAddProject() {
  // переход на страницу добавления
}

function goToManageProjects() {
  // переход на страницу управления
}
</script>

<style scoped lang="scss">
.admin-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .admin-section {
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #fafafa;

    &__project {
        margin-bottom: 50px;
    }
  }

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
    }
  }

  .button-group {
    display: flex;
    gap: 1rem;
    button {
      flex: 1;
    }
  }

  button {
    padding: 0.6rem 1.2rem;
    background-color: #222;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #444;
    }
  }
}
</style>
