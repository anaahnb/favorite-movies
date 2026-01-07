import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const showRegisterModal = ref(false);
  const showLoginModal = ref(false);

  function openRegister() {
    showRegisterModal.value = true;
  }

  function closeRegister() {
    showRegisterModal.value = false;
  }

  function openLogin() {
    showLoginModal.value = true;
  }

  function closeLogin() {
    showLoginModal.value = false;
  }

  return {
    showRegisterModal,
    showLoginModal,

    openRegister,
    closeRegister,
    openLogin,
    closeLogin,
  };
});
