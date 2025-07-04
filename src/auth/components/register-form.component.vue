<template>
  <article class="main-container">
    <section class="register-image-container">
      <img src="../../assets/images/register-image.png" alt="pet" class="register-image" />
    </section>

    <section class="login-container">
      <form @submit.prevent="handleRegister" class="login-form">
        <span class="input-label">{{ $t('signup.correo-label') }}</span>
        <section class="input">
          <input v-model="email" type="email" :placeholder="$t('signup.correo')" required />
        </section>

        <span class="input-label">{{ $t('signup.usuario-label') }}</span>
        <section class="input">
          <input v-model="username" type="text" :placeholder="$t('signup.usuario')" required />
        </section>

        <span class="input-label">{{ $t('signup.contrasena-label') }}</span>
        <section class="input">
          <input v-model="password" type="password" :placeholder="$t('signup.contrasena')" required />
        </section>
        <section class="button-container">
          <section class="radio-buttons">
            <input type="radio" id="admin" value="admin" v-model="role" required />
            <label for="client">{{ $t('signup.options.option1') }}</label>
            <input type="radio" id="client" value="client" v-model="role" required />
            <label for="admin">{{ $t('signup.options.option2') }}</label>
          </section>
        </section>

        <button type="submit" class="login-button">{{ $t('signup.boton') }}</button>
      </form>
    </section>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import User from '../models/user.model';
import { createUser } from '../services/user.service';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const username = ref('');
const password = ref('');
const role = ref('admin');

const handleRegister = async () => {
  const newUser = new User({ email: email.value, username: username.value, password: password.value, role: role.value });

  if (!User.isValid(newUser)) {
    return;
  }

  try {
    await createUser(newUser);
    router.push('/');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
  }
};
</script>

<style scoped>
.routering {
  padding: 8px 50px;
  font-size: 14px;
  margin-top: 16px;
  text-decoration: none;
  color: black;
  background-color: #EAF7FC;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  padding: 0 80px;
}

.register-image-container {
  display: flex;
  justify-content: center;
  width: 40%;
  height: auto;
}

.register-image {
  width: 80%;
  height: auto;
}

.login-text-container {
  display: flex;
  justify-content: center;
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
  width: 25%;
  margin: 20px;
  padding: 20px 60px 40px 60px;
  background-color: #6ABFE3;
  border: solid 1px #000000;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.login-button {
  margin: auto;
  width: 70%;
  margin-top: 8px;
  color: #686868;
  padding: 6px 8px;
  text-align: center;
  cursor: pointer;
}

.input {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #EAF7FC;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 8px;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
}

.radio-buttons {
  display: flex;
  justify-content: space-between;
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