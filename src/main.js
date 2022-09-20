import { createApp } from 'vue';
import App from './App.vue';
import config from './config';
import router from './router';
import store from './store';
// TODO don't seem to need bootstrap javascript; remove this?
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(store).use(router).mount('#app');

app.config.globalProperties.$config = config;
