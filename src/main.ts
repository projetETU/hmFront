import './assets/main.css'
// Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import dayjs from 'dayjs';
import { createPinia } from 'pinia'
import 'dayjs/locale/fr';
dayjs.locale('fr');

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs;

const pinia = createPinia()
app.use(pinia)

app.use(router)
app.use(VueApexCharts)

app.mount('#app')
