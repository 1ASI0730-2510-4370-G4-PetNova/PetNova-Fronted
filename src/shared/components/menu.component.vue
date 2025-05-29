<script>
import {$t} from "@primeuix/styled";
</script>

<template>
    <section class="menu-container">
        <section class="menu-header">
            <img src="../../assets/images/navbar-person.png" alt="person" class="navbar-person">
            <ul>
                <router-link to="/start" class="routering">
                    <li class="li-primary-options">
                        <img src="../../assets/images/navbar-start-icon.png" alt="start">
                        <span class="li-primary-options-text">{{ $t('navbar.inicio') }}</span>
                    </li>
                </router-link>
                <router-link to="/clients" class="routering">
                    <li class="li-primary-options">
                        <img src="../../assets/images/navbar-client-icon.png" alt="client">
                        <span class="li-primary-options-text">{{ $t('navbar.clientes') }}</span>
                    </li>
                </router-link>
                <router-link to="/pets" class="routering">
                    <li class="li-primary-options">
                        <img src="../../assets/images/navbar-pet-icon.png" alt="pet">
                        <span class="li-primary-options-text">{{ $t('navbar.mascotas') }}</span>
                    </li>
                </router-link>
                <router-link to="/appointments" class="routering">
                    <li class="li-primary-options">
                        <img src="../../assets/images/navbar-calendar-icon.png" alt="calendar">
                        <span class="li-primary-options-text">{{ $t('navbar.citas') }}</span>
                    </li>
                </router-link>
                <router-link to="/" class="routering">
                    <li class="li-primary-options">
                        <img src="../../assets/images/navbar-logout-icon.png" alt="logout">
                        <span class="li-primary-options-text">{{ $t('navbar.cerrar-sesion') }}</span>
                    </li>
                </router-link>
            </ul>
        </section>
        <section class="menu-footer">
            <ul>
                <li>
                    <span>{{ $t('navbar.legal') }}</span>
                </li>
                <li>
                    <span>{{ $t('navbar.terminos') }}</span>
                </li>
                <li>
                    <span>{{ $t('navbar.politicas') }}</span>
                </li>
            </ul>
        </section>
    </section>
</template>

<style scoped>
.routering {
    font-size: 14px;
    margin-top: 16px;
    text-decoration: none;
    color: black;
}

.menu-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15%;
    height: 100vh;
    background-color: #1E3A5F;
}

.menu-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
}

.menu-footer {
    margin: 0px 0px 10px 20px;
}

.navbar-person {
    width: 150px;
}

ul {
    list-style: none;
    padding: 0;
}

.li-primary-options {
    display: flex;
    align-items: center;
    padding: 30px 40px;
}

@media (max-width: 1600px) {
    .li-primary-options {
        padding: 50px;
    }
}

.li-primary-options:hover {
    background-color: #225286;
    cursor: pointer;
}

.li-primary-options-text {
    font-size: 20px;
    margin-left: 15px;
}

span {
    color: #FFFFFF;
}
</style>