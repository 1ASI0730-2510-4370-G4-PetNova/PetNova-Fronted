<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-illustration">
        <div class="pet-silhouette">
          <img
            src="../../assets/images/navbar-logo.png"
            alt="PetNova Logo"
            class="logo-404"
          />
        </div>
        <div class="error-code">404</div>
      </div>

      <div class="error-message">
        <h1 class="error-title">{{ $t("404.titulo") }}</h1>
        <p class="error-description">{{ $t("404.descripcion") }}</p>
        <div class="paw-prints">
          <span class="paw">🐾</span>
          <span class="paw">🐾</span>
          <span class="paw">🐾</span>
        </div>
      </div>

      <div class="error-actions">
        <button @click="goHome" class="btn-home">
          <img
            src="../../assets/images/navbar-start-icon.png"
            alt="Home"
            class="btn-icon"
          />
          {{ $t("404.volver-atras") }}
        </button>
      </div>
    </div>

    <div class="floating-elements">
      <div class="floating-paw paw-1">🐾</div>
      <div class="floating-paw paw-2">🐾</div>
      <div class="floating-paw paw-3">🐾</div>
      <div class="floating-paw paw-4">🐾</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.go(-1);
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6abfe3 0%, #4a90e2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.error-illustration {
  margin-bottom: 30px;
  position: relative;
}

.pet-silhouette {
  margin-bottom: 20px;
}

.logo-404 {
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: #ff6b6b;
  text-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  margin: 0;
  line-height: 1;
  animation: pulse 2s ease-in-out infinite;
}

.error-message {
  margin: 30px 0;
}

.error-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 700;
}

.error-description {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 20px;
  line-height: 1.6;
}

.paw-prints {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.paw {
  font-size: 1.5rem;
  animation: bounce 1s ease-in-out infinite;
}

.paw:nth-child(2) {
  animation-delay: 0.2s;
}

.paw:nth-child(3) {
  animation-delay: 0.4s;
}

.error-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-home {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 160px;
  justify-content: center;
  background: linear-gradient(135deg, #6abfe3, #4a90e2);
  color: white;
  box-shadow: 0 5px 15px rgba(106, 191, 227, 0.4);
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(106, 191, 227, 0.6);
}

.btn-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-paw {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float-around 15s ease-in-out infinite;
}

.paw-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.paw-2 {
  top: 60%;
  right: 15%;
  animation-delay: 3s;
}

.paw-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 6s;
}

.paw-4 {
  top: 30%;
  right: 30%;
  animation-delay: 9s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes float-around {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
  75% {
    transform: translateY(-15px) rotate(3deg);
  }
}

@media (max-width: 768px) {
  .not-found-content {
    margin: 20px;
    padding: 30px 20px;
  }

  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-home {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .logo-404 {
    width: 80px;
    height: 80px;
  }

  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }
}
</style>
