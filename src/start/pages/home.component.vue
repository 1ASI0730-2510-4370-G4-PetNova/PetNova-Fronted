<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="header-container">
        <LanguageSwitch />
        <Notification />
      </section>

      <section class="settings-profile-container">
        <h2>Settings and profile</h2>

        <section class="tabs">
          <button :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">Profile</button>
          <button :class="{ active: activeTab === 'picture' }" @click="activeTab = 'picture'">Profile picture</button>
        </section>

        <!-- Pestaña Profile -->
        <section v-if="activeTab === 'profile'" class="profile-tab">
          <div v-if="editing">
            <form @submit.prevent="saveProfile">
              <label for="name">Name:</label>
              <input id="name" v-model="profile.name" placeholder="NAME" />

              <label for="lastname">Last name:</label>
              <input id="lastname" v-model="profile.lastname" placeholder="LAST NAME..." />

              <label for="specialty">specialty:</label>
              <input id="specialty" v-model="profile.specialty" placeholder="SPECIALTY" />

              <label for="biography">Biography</label>
              <textarea id="biography" v-model="profile.biography" placeholder="BIOGRAPHY..."></textarea>

              <div class="button-group">
                <button type="button" class="delete-button" @click="deleteProfile">Delete</button>
                <button type="submit" class="edit-button">Save</button>
              </div>
            </form>
          </div>

          <div v-else class="profile-static">
            <div class="field-box">
              <strong>Name:</strong>
              <div class="field-value">{{ profile.name || '-' }}</div>
            </div>
            <div class="field-box">
              <strong>Last name:</strong>
              <div class="field-value">{{ profile.lastname || '-' }}</div>
            </div>
            <div class="field-box">
              <strong>Specialty:</strong>
              <div class="field-value">{{ profile.specialty || '-' }}</div>
            </div>
            <div class="field-box">
              <strong>Biography:</strong>
              <div class="field-value bio-text">{{ profile.biography || '-' }}</div>
            </div>

            <div class="button-group">
              <button class="edit-button" @click="editing = true">Edit</button>
            </div>
          </div>
        </section>

        <!-- Pestaña Profile picture -->
        <section v-if="activeTab === 'picture'" class="picture-tab">
          <div class="picture-container">
            <div v-if="imageSaved">
              <div class="avatar-box">
                <img :src="savedImage || defaultImage" alt="Profile" />
                <!-- Texto "Profile" oculto al estar guardada la imagen -->
              </div>

              <p class="full-name">{{ fullName }}</p>

              <div class="button-group">
                <button class="edit-button" @click="editImage">Edit</button>
              </div>
            </div>

            <div v-else>
              <div class="avatar-box">
                <img :src="imagePreview || savedImage || defaultImage" alt="Profile" />
                <span>Profile</span>  <!-- Solo visible en modo edición -->
              </div>

              <p class="image-description">Image preview</p>
              <small class="image-note">Minimum 200x200 pixels, maximum 6000x6000 pixels</small>

              <input type="file" accept="image/*" @change="onFileChange" />

              <div class="file-info">
                {{ selectedFileName || 'You have not selected any files' }}
              </div>

              <button class="save-button" @click="saveProfilePicture" :disabled="!imagePreview">Save</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';

import MenuComponent from '../../shared/components/menu.component.vue';
import Notification from '../components/notification.component.vue';
import LanguageSwitch from '../../shared/components/language-switcher.component.vue';

const activeTab = ref('profile');

const profile = ref({
  name: '',
  lastname: '',
  specialty: '',
  biography: ''
});

const editing = ref(true);

// Imagenes
const defaultImage = '../../assets/images/avatar-placeholder.png';
const savedImage = ref('');
const imagePreview = ref('');
const selectedFileName = ref('');
const imageSaved = ref(false);

const fullName = computed(() => {
  const n = profile.value.name.trim();
  const l = profile.value.lastname.trim();
  if (n || l) {
    return `${n} ${l}`.trim();
  }
  return '-';
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFileName.value = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    selectedFileName.value = '';
    imagePreview.value = '';
  }
};

const saveProfilePicture = () => {
  if (imagePreview.value) {
    savedImage.value = imagePreview.value;
    imagePreview.value = '';
    selectedFileName.value = '';
    imageSaved.value = true;
    alert('Profile picture saved!');
  }
};

const editImage = () => {
  imageSaved.value = false;
};

const saveProfile = () => {
  editing.value = false;
};

const deleteProfile = () => {
  profile.value = {
    name: '',
    lastname: '',
    specialty: '',
    biography: ''
  };
  editing.value = true;
};
</script>

<style scoped>
article {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  width: 80%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-bottom: 15px;
}

.settings-profile-container {
  padding: 10px 20px;
  background-color: #f0f8fc;
  border-radius: 10px;
}

h2 {
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 28px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  background-color: #dbeefb;
  border: none;
  padding: 8px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: #000000b2;
}

.tabs button.active {
  background-color: #6abfe3;
  color: white;
}

.profile-tab form {
  background-color: #dff4fd;
  border-radius: 15px;
  padding: 20px;
  max-width: 700px;
}

.profile-tab label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 12px;
}

.profile-tab input,
.profile-tab textarea {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #c1d8e6;
  font-size: 14px;
  color: #333;
  resize: vertical;
}

.profile-tab textarea {
  min-height: 80px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.delete-button,
.edit-button {
  background-color: #add8e6;
  border: none;
  padding: 10px 40px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #e37a7a;
  color: white;
}

.edit-button:hover {
  background-color: #6abfe3;
  color: white;
}

.profile-static {
  width: 100%;
}

.field-box {
  background-color: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  padding: 20px 25px;
  margin-bottom: 18px;
  width: 100%;
  box-sizing: border-box;
  min-height: 60px;
}

.field-value {
  margin-top: 8px;
  font-size: 17px;
  color: #000000;
  min-height: 40px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.bio-text {
  white-space: pre-wrap;
}

.picture-tab {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.picture-container {
  background-color: #6abfe3;
  border-radius: 15px;
  padding: 30px 40px;
  max-width: 400px;
  width: 100%;
  color: black;
  text-align: center;
  box-sizing: border-box;
}

.avatar-box {
  background-color: #7fc1e9;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  margin: 0 auto 20px auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-box img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-box span {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: black;
  font-weight: 400;
  font-size: 14px;
}

.full-name {
  font-size: 18px;
  font-weight: 600;
  margin-top: 12px;
  margin-bottom: 20px;
  color: black;
}

.image-description {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
}

.image-note {
  display: block;
  font-size: 12px;
  margin-bottom: 20px;
  color: #0000008a;
}

input[type="file"] {
  margin-bottom: 15px;
  cursor: pointer;
}

.file-info {
  background-color: #7fc1e9;
  border-radius: 20px;
  padding: 15px;
  font-size: 12px;
  color: black;
  margin-bottom: 25px;
  text-align: center;
}

.save-button {
  background-color: #6abfe3;
  border: 1px solid #2b99d7;
  border-radius: 10px;
  padding: 10px 60px;
  font-size: 20px;
  cursor: pointer;
  color: black;
  transition: background-color 0.3s ease;
}

.save-button:disabled {
  background-color: #a1c9e3;
  border-color: #7aaed7;
  cursor: not-allowed;
  color: #555;
}

.save-button:hover:not(:disabled) {
  background-color: #58a1c8;
  color: white;
}
</style>
