<template>
  <div
      @mouseenter="showNotifications = true"
      @mouseleave="showNotifications = false"
      style="display: inline-block; position: relative;"
  >
    <img
        src="../../assets/images/notification-icon.png"
        alt="notification"
        class="notification-icon"
    />
    <section v-if="showNotifications && notifications.length" class="select">
      <div v-for="notif in notifications" :key="notif.id" class="notification">
        <span class="notification-description">{{ notif.description }}</span>
        <span class="notification-date">{{ notif.date }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const notifications = ref([]);
const showNotifications = ref(false);

watch(showNotifications, async (visible) => {
  if (visible && notifications.value.length === 0) {
    try {
      // Aquí podrías apuntar a un endpoint distinto para Inicio
      const { data } = await axios.get('https://fake-api-rose-psi.vercel.app/home-notifications');
      notifications.value = data;
    } catch (error) {
      console.error('Notification error:', error);
    }
  }
});
</script>

<style scoped>
.notification-icon {
  width: 40px;
  cursor: pointer;
  margin-right: 10px;
}

.select {
  position: absolute;
  right: 0;
  top: 100%;
  padding: 5px;
  border-radius: 5px;
  background: white;
  border: 1px solid #ccc;
  margin-top: 10px;
  z-index: 10;
}

.notification {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.notification-description {
  font-size: 14px;
  color: #555;
}

.notification-date {
  font-size: 12px;
  color: #999;
}
</style>