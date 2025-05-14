<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import navbarComponent from './shared/components/navbar.component.vue';

export default {
  name: 'App',
  components: {
    navbarComponent
  }
};
</script>