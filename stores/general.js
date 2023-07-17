import { defineStore } from 'pinia';

export const useGeneralStore = defineStore(
  'general',
  () => {
    const isLoginOpen = ref(false);
    const isEditProfileOpen = ref(false);
    const selectedPost = ref(null);
    const ids = ref(null);
    const isBackUrl = ref('/');
    const posts = ref(null);
    const suggested = ref(null);
    const following = ref(null);

    const getIsLoginOpen = computed(() => isLoginOpen.value);
    const getIsEditProfileOpen = computed(() => isEditProfileOpen.value);
    const getSelectedPost = computed(() => selectedPost.value);
    const getIds = computed(() => ids.value);
    const getIsBackUrl = computed(() => isBackUrl.value);
    const getPosts = computed(() => posts.value);
    const getSuggested = computed(() => suggested.value);
    const getFollowing = computed(() => following.value);

    const setIsLoginOpen = (val) => {
      isLoginOpen.value = val;
    };

    return {
      // Getters
      getIsLoginOpen,
      getIsEditProfileOpen,
      getSelectedPost,
      getIds,
      getPosts,
      getIsBackUrl,
      getSuggested,
      getFollowing,

      // Actions
      setIsLoginOpen,
    };
  },
  {
    persist: true,
  }
);

