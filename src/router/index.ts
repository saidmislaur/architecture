import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/AdminDashboard.vue';
import Projects from '../views/Portfolio.vue';
// import ProjectDetailsPage from '../components/ProjectDetailsPage.vue';
import ProjectDetailPage from '../views/ProjectDetailPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin-dashboard',
    name: 'Admin',
    component: Admin,
  },
  { 
    path: '/projects', 
    component: Projects, 
    name: 'project' 
  },
  { 
    path: '/projects/:id', 
    component: ProjectDetailPage, 
    name: 'project-details' 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
  }
});

export default router;
