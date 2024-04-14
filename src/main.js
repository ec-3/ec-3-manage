import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
// import './router/permition.js';
import store from './store';
import '@/assets/scss/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

app.use(router);
app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');
