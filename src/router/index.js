import { createRouter, createWebHistory } from 'vue-router';
import loginComponent from '../auth/pages/login.component.vue';
import registerComponent from '../auth/pages/register.component.vue';
import clients from '../vet/clients/pages/clients.component.vue';
import pets from '../vet/pets/pages/pets.component.vue';
import appointments from '../vet/appointments/pages/appointments.component.vue';
import dashboard from '../client/dashboard/pages/dashboardpage.component.vue';
import dashvet from '../vet/dashboard/pages/dashvet.component.vue';

const routes = [
    { path: '/', component: loginComponent },
    { path: '/register', component: registerComponent },
    { path: '/dashboard', component: dashboard },
    { path: '/dashboard/vet', component: dashvet },
    { path: '/clients', component: clients },
    { path: '/pets', component: pets },
    { path: '/appointments', component: appointments },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
