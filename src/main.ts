import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import initRouter from './routes.ts';

const app = createApp(App);
const router = initRouter('');

app.use(router);
app.mount('#app');
