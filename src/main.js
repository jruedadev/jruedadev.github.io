
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
import ContactComponent from "./components/Sections/Contact.vue";
import SkillsComponent from "./components/Sections/Skills.vue";
import WorkComponent from "./components/Sections/Work.vue";
import NotFoundComponent from "./components/Sections/NotFound.vue";
const routes = [
    { path: "/", component: HomeComponent, name: "Home" },
    { path: "/about", component: AboutComponent, name: "About" },
    { path: "/skills", component: SkillsComponent, name: "Skills" },
    { path: "/work", component: WorkComponent, name: "Work" },
    { path: "/contact", component: ContactComponent, name: "Contact" },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(i18n).use(router).use(VueGtag, {
    appName: 'JRuedaDev WebApp',
    pageTrackerScreenviewEnabled: true,
    config: { id: "G-9VFF5S5Z1G" }
}, router).mount('#app');

import "bootstrap/dist/js/bootstrap.js";
import i18n from './i18n'