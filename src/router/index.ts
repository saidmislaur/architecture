import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ProjectDetailsPage from '../components/ProjectDetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
   { path: '/projects/:id', component: ProjectDetailsPage, name: 'project-details' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
