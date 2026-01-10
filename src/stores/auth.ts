import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser, registerUser, logoutUser, me } from '~/api/auth';
import type { RegisterForm } from '~/types/register';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = ref<any | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const loading = ref(false);
  const initialized = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  async function register(payload: RegisterForm) {
    loading.value = true;
    try {
      const res = await registerUser(payload);
      token.value = res.token;
      localStorage.setItem('token', res.token);

      await fetchUser();
      return res;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function login(payload: { email: string; password: string }) {
    loading.value = true;
    try {
      const res = await loginUser(payload);
      token.value = res.token;
      localStorage.setItem('token', res.token);

      await fetchUser();
      return res;
    } finally {
      loading.value = false;
    }
  }

  async function fetchUser() {
    if (!token.value) {
      initialized.value = true;
      return;
    }

    try {
      user.value = await me();
    } catch {
      logout();
    } finally {
      initialized.value = true;
    }
  }

  function clearSession() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  }


  async function logout() {
    try {
      await logoutUser();
      router.push({ name: '/' });
    } finally {
      clearSession();
    }
  }


  return {
    user,
    token,
    loading,
    isAuthenticated,
    initialized,
    register,
    login,
    logout,
    fetchUser,
  };
});
