import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import './style.css'
import App from './App.vue'
import initRouter from './routes.ts';

const app = createApp(App);
const router = initRouter('');
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ToastPlugin);

app.mount('#app');
