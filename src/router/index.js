import { createRouter, createWebHistory } from 'vue-router';
import loginComponent from '../auth/pages/login.component.vue';
import registerComponent from '../auth/pages/register.component.vue';
import clients from '@/vet/clients/pages/clients.component.vue';
import pets from '@/vet/pets/pages/pets.component.vue';
import appointments from '@/vet/appointments/pages/appointments.component.vue';
import profileComponent from '@/vet/profile/pages/profile.component.vue';
import petsClients from '@/client/pets/pages/pets.component.vue';
import appointmentsClients from '@/client/appointments/pages/appointments.component.vue';
import profileComponentClients from '@/client/profile/pages/profile.component.vue';


const routes = [
    { path: '/', component: loginComponent },
    { path: '/register', component: registerComponent },
    { path: '/clients', component: clients },
    { path: '/pets', component: pets },
    { path: '/appointments', component: appointments },
    {
        path: '/pets/:id/history',
        name: 'PetHistory',
        component: () => import('@/vet/pets/pages/pet-history.component.vue'),
        props: true,
        children: [
            {
                path: '',
                redirect: 'clinical' // redirige por defecto
            },
            {
                path: 'clinical',
                name: 'ClinicalManagement',
                component: () => import('@/vet/pets/pages/clinical-management.component.vue'),
                props: true
            },
            {
                path: 'preventive',
                name: 'PreventiveCare',
                component: () => import('@/vet/pets/pages/preventive-care.component.vue'),
                props: true
            }
        ]
    },
    { path: '/profile', component: profileComponent },
    { path: '/petsClients', component: petsClients },
    { path: '/appointmentsClients', component: appointmentsClients},
    { path: '/profileClients', component: profileComponentClients },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
