import { createRouter, createWebHistory } from 'vue-router'
import {
  HomeComponent,
  AboutComponent,
  SkillsComponent,
  WorkComponent,
  ContactComponent,
  NotFoundComponent
} from '../views/Sections'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeComponent, name: 'Home' },
    { path: '/about', component: AboutComponent, name: 'About' },
    { path: '/skills', component: SkillsComponent, name: 'Skills' },
    { path: '/work', component: WorkComponent, name: 'Work' },
    { path: '/contact', component: ContactComponent, name: 'Contact' },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent }
  ]
})

export default router
