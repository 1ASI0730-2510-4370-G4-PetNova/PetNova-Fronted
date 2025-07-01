<template>
  <div class="login-container">
    <section class="login-text-container">
      <h2 class="login-text">{{ $t('login.titulo') }}</h2>
    </section>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="input">
        <img src="../../assets/images/email-icon.png" alt="email" class="email-icon" />
        <input v-model="email" type="email" :placeholder="$t('login.correo')" required />
      </div>
      <div class="input">
        <img src="../../assets/images/password-icon.png" alt="password" class="password-icon" />
        <input v-model="password" type="password" :placeholder="$t('login.contrasena')" required />
      </div>

      <button type="submit" class="login-button">{{ $t('login.boton') }}</button>

      <router-link to="/register" class="forgot-password">
        {{ $t('login.olvidaste') }}
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getUsers } from '../services/user.service';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    return;
  }

  try {
    const users = await getUsers();
    const foundUser = users.find(
      user => user.email === email.value && user.password === password.value
    );

    if (foundUser) {
      router.push('/clients');
    } else {
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

<style scoped>
.login-text-container {
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 8px;
}

.login-text {
  font-weight: 400;
  text-align: center;
  font-size: 20px;
  letter-spacing: 2px;
}

.login-container {
  display: flex;
  flex-direction: column;
  width: 21%;
  margin: 10% auto;
  padding: 20px 60px 40px 60px;
  background-color: #6ABFE3;
  border: solid 1px #000000;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.forgot-password {
  font-size: 14px;
  margin-top: 16px;
  text-decoration: none;
  color: black;
}

.login-button {
  width: 70%;
  background-color: #EAF7FC;
  color: #686868;
  padding: 12px 8px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}

.input {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #EAF7FC;
}

.email-icon {
  width: 26px;
  margin-right: 30px;
}

.password-icon {
  width: 20px;
  margin-right: 55px;
}

button {
  border: solid 1px #686868;
}

input {
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
}
</style>