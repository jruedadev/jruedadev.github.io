import { AboutComponent, ContactComponent, SkillsComponent, WorkComponent, NotFoundComponent, HomeComponent } from "../views/Sections";

export const routes = [
    { path: "/", component: HomeComponent, name: "Home" },
    { path: "/about", component: AboutComponent, name: "About" },
    { path: "/skills", component: SkillsComponent, name: "Skills" },
    { path: "/work", component: WorkComponent, name: "Work" },
    { path: "/contact", component: ContactComponent, name: "Contact" },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
];