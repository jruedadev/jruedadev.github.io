import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/**
 * Custom Libraries
 */
import VueGtag from "vue-gtag";
import i18n from './i18n'

const app = createApp(App)
console.log(import.meta.env)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueGtag, {
    appName: 'JRuedaDev WebApp',
    pageTrackerScreenviewEnabled: true,
    config: { id: import.meta.env.VITE_GTAG_ID }
}, router);

app.mount('#app')
