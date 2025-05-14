<script>
import PvSelectButton from 'primevue/selectbutton';

export default {
  name: "language-switcher",
  components: {PvSelectButton},
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    }
  },
  created() {
    this.$i18n.locale = 'es';
  }
}
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="languages" class="uppercase select"/>
</template>

<style>
.p-selectbutton .p-button.p-highlight {
  background-color: #1E3A5F;
  border-color: transparent;
  box-shadow: none !important;
}

.select {
  margin-right: 15px;
}
</style>