import { defineStore } from 'pinia';
import axios from '~/plugins/axios';

export const useProfileStore = defineStore(
  'profile',
  () => {
    const $axios = axios().provide.axios;

    const id = ref('');
    const name = ref('');
    const bio = ref('');
    const image = ref('');
    const post = ref(null);
    const posts = ref(null);
    const allLikes = ref(0);

    // Getters
    const getId = computed(() => id.value);
    const getName = computed(() => name.value);
    const getBio = computed(() => bio.value);
    const getImage = computed(() => image.value);
    const getPost = computed(() => post.value);
    const getPosts = computed(() => posts.value);
    const getAllLikes = computed(() => allLikes.value);

    // Actions
    const getProfile = async (userId) => {
      resetUser();

      const res = await $axios.get(`/api/profiles/${userId}`);

      const user = res?.data?.user[0];

      if (user) {
        id.value = user.id;
        name.value = user.name;
        bio.value = user.bio;
        image.value = user.image;
      }

      posts.value = res?.data?.posts;
    };

    // Methods
    const resetUser = () => {
      id.value = '';
      name.value = '';
      bio.value = '';
      image.value = '';
      posts.value = '';
    };

    return {
      // Getters
      getId,
      getName,
      getBio,
      getImage,
      getPost,
      getPosts,
      getAllLikes,

      // Actions
      getProfile,

      // Methods
      resetUser,
    };
  },
  {
    persist: true,
  }
);

