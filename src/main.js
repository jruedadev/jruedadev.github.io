import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import "./assets/scss/custom.scss";

import HomeComponent from "./components/Home.vue";
import AboutComponent from "./components/Sections/About.vue";
import NotFoundComponent from "./components/404.vue";
const routes = [
    { path: "/", component: HomeComponent },
    { path: "/about", component: AboutComponent },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(router).mount('#app');

import "bootstrap/dist/js/bootstrap.js";