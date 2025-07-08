import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/AdminDashboard.vue';
import Portfolio from '../views/Portfolio.vue';
// import ProjectDetailsPage from '../components/ProjectDetailsPage.vue';
import ProjectDetailPage from '../views/ProjectDetailPage.vue';
import AdminPosts from '../components/admin/AdminPosts.vue';
import ProjectEditor from '../components/admin/ProjectEditor.vue';

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
    component: Portfolio, 
    name: 'project' 
  },
  { 
    path: '/projects/:id', 
    component: ProjectDetailPage, 
    name: 'project-details' 
  },
  {
    path: '/admin/projects',
    component: AdminPosts,
    name: 'admin-projects'
  },
  {
    path: '/admin/posts/edit/:id',
    component: ProjectEditor,
    name: 'admin-edit'
  },
  {
    path: '/admin/posts/new',
    component: ProjectEditor,
    name: 'create-edit'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
