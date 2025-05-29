import { createRouter, createWebHistory } from 'vue-router';
import loginComponent from '../auth/pages/login.component.vue';
import registerComponent from '../auth/pages/register.component.vue';
import clients from '../clients/pages/clients.component.vue';
import pets from '../pets/pages/pets.component.vue';
import appointments from '../appointments/pages/appointments.component.vue';
import start from '../start/pages/home.component.vue'

const routes = [
    { path: '/', component: loginComponent },
    { path: '/register', component: registerComponent },
    { path: '/start', component: start },
    { path: '/clients', component: clients },
    { path: '/pets', component: pets },
    { path: '/appointments', component: appointments },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
