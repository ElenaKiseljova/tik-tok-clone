import { defineStore } from 'pinia';
import axios from '~/plugins/axios';

export const useUserStore = defineStore(
  'user',
  () => {
    const $axios = axios().provide.axios;
    const id = ref('');
    const name = ref('');
    const bio = ref('');
    const image = ref('');

    // Getters
    const getId = computed(() => id.value);
    const getName = computed(() => name.value);
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

    const getUser = async () => {
      const { data } = await $axios.get('/api/logged-in-user');

      const user = data[0];

      id.value = user.id;
      name.value = user.name;
      bio.value = user.bio;
      image.value = user.image;
    };

    return {
      // Getters
      getId,
      getName,
      getBio,
      getImage,

      // Actions
      getTokens,
      login,
      getUser,
    };
  },
  {
    persist: true,
  }
);

