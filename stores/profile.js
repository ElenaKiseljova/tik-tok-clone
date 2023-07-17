import { defineStore } from 'pinia';

export const useProfileStore = defineStore(
  'profile',
  () => {
    const id = ref('');
    const name = ref('');
    const bio = ref('');
    const image = ref('');
    const post = ref(null);
    const posts = ref(null);
    const allLikes = ref(0);

    const getId = computed(() => id.value);
    const getName = computed(() => name.value);
    const getBio = computed(() => bio.value);
    const getImage = computed(() => image.value);
    const getPost = computed(() => post.value);
    const getPosts = computed(() => posts.value);
    const getAllLikes = computed(() => allLikes.value);

    return { getId, getName, getBio, getImage, getPost, getPosts, getAllLikes };
  },
  {
    persist: true,
  }
);

