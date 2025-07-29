import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin/AdminDashboard.vue';
import AdminLogin from '../views/Admin/AdminLogin.vue'
import Projects from '../views/Portfolio.vue';
import ProjectDetailPage from '../views/ProjectDetailPage.vue';
import Service from '../views/ServiceDetail.vue';
import {getToken} from '../utils/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  {
    path: '/admin-dashboard',
    component: Admin,
    name: 'admin',
     meta: { requiresAuth: true }
  },
  {
    path: '/admin-login',
    component: AdminLogin,
    name: 'admin-login',
  },
  {
    path: '/service/:type',
    component: Service,
    name: 'service',
  }
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!getToken()
  if(to.meta.requiresAuth && !isAuthenticated) {
    next('/admin-login')
  } else {
    next()
  }
})
export default router;
