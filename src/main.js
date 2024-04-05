import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import GAuth from 'vue3-google-oauth2'
import '@/assets/scss/index.scss'

const app = createApp(App)

app.use(router)

// app.use(GAuth, {
//     clientId: '394621226423-koka0qfg41sl3489j9vqap586sdf69r6.apps.googleusercontent.com',
//     scope: 'email',
//     prompt: 'consent',
//     fetch_basic_profile: false
// })



app.mount('#app')
