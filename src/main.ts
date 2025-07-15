import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/main.scss'

import AOS from 'aos';
import 'aos/dist/aos.css';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

AOS.init()

const app = createApp(App);

app.use(router);
app.mount('#app');
