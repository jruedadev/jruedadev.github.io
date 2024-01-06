import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import VueGtag from "vue-gtag";

import App from './App.vue';
import { routes } from './routes';
import "./assets/scss/custom.scss";
import "bootstrap/dist/js/bootstrap.js";
import i18n from './i18n'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(i18n).use(router).use(VueGtag, {
    appName: 'JRuedaDev WebApp',
    pageTrackerScreenviewEnabled: true,
    config: { id: process.env.VUE_APP_GTAG_ID }
}, router).mount('#app');
