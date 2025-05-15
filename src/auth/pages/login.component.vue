<template>
  <NavbarComponent/>
  <LoginComponent/>
</template>

<script>
import NavbarComponent from '../../shared/components/navbar.component.vue';
import LoginComponent from '../components/login-form.component.vue';

export default {
  components: {
    NavbarComponent,
    LoginComponent
  }
};
</script>
