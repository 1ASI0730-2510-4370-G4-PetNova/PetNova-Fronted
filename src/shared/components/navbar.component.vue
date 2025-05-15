<script>
import {$t} from "@primeuix/styled";
</script>

<template>
    <PvMenubar class="navbar">
        <template #start>
            <router-link to="/" class="routering">
                <img src="../../assets/images/navbar-logo.png" alt="logo" class="logo" />
            </router-link>
        </template>
        <template #end>
            <span class="navbar-button">
                {{ $t('contactenos') }}
            </span>
        </template>
    </PvMenubar>
</template>

<style scoped>
.logo {
    width: 60px;
}

.navbar {
    background-color: #1E3A5F;
    padding: 10px 100px;
    border: solid 0px transparent;
    border-radius: 0px;
}

.navbar-button {
    padding: 10px 25px;
    background-color: #A0AAB2;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}
</style>