
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

// import * as Vue from 'vue';
import VueGtag from "vue-gtag";
// import VueMeta from 'vue-meta';

import App from './App.vue';

// Vue.use(VueMeta);
import "./assets/scss/custom.scss";

import HomeComponent from "./components/Home.vue";
import AboutComponent from "./components/Sections/About.vue";
// import NotFoundComponent from "./components/404.vue";
const routes = [
    { path: "/", component: HomeComponent },
    { path: "/about", component: AboutComponent },
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(router).use(VueGtag, {
    appName: 'JRuedaDev WebApp',
    pageTrackerScreenviewEnabled: true,
    config: { id: "G-9VFF5S5Z1G" }
}, router).mount('#app');

import "bootstrap/dist/js/bootstrap.js";