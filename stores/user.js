import { defineStore } from 'pinia';
import axios from '~/plugins/axios';

export const useUserStore = defineStore(
  'user',
  () => {
    const $axios = axios().provide.axios;
    const id = ref('');
    const name = ref('');
    const email = ref('');
    const bio = ref('');
    const image = ref('');

    // Getters
    const getId = computed(() => id.value);
    const getName = computed(() => name.value);
    const getEmail = computed(() => email.value);
    const getBio = computed(() => bio.value);
    const getImage = computed(() => image.value);

    // Actions
    const getTokens = async () => {
      await $axios.get('/sanctum/csrf-cookie');
    };

    const login = async (email, password) => {
      await $axios.post('/login', {
        email,
        password,
      });
    };

    const register = async (name, email, password, confirmPassword) => {
      await $axios.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
    };

    const getUser = async () => {
      const { data } = await $axios.get('/api/logged-in-user');

      const user = data[0];

      id.value = user.id;
      name.value = user.name;
      email.value = user.email;
      bio.value = user.bio;
      image.value = user.image;
    };

    const logout = async () => {
      await $axios.post('/logout');

      resetUser();
    };

    // Methods
    const resetUser = () => {
      id.value = '';
      name.value = '';
      email.value = '';
      bio.value = '';
      image.value = '';
    };

    return {
      // Getters
      getId,
      getName,
      getEmail,
      getBio,
      getImage,

      // Actions
      getTokens,
      login,
      register,
      getUser,
      logout,
    };
  },
  {
    persist: true,
  }
);

