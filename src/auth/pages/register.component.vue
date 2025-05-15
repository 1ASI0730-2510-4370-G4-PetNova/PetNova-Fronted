<template>
  <navbarComponent/>
  <registerComponent/>
</template>

<script>
import navbarComponent from '../../shared/components/navbar.component.vue';
import registerComponent from '../components/register-form.component.vue';

export default {
  components: {
    navbarComponent,
    registerComponent
  }
};
</script>
