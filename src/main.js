import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router'
import './style.css'
import App from './App.vue'

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
//app.use(cors());
app.use(router).mount('#app')