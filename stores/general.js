import { defineStore } from 'pinia';
import axios from '~/plugins/axios';

import { useUserStore } from '~/stores/user';

export const useGeneralStore = defineStore(
  'general',
  () => {
    const $axios = axios().provide.axios;

    const { resetUser } = useUserStore();

    const isLoginOpen = ref(false);
    const isEditProfileOpen = ref(false);
    const selectedPost = ref(null);
    const ids = ref(null);
    const isBackUrl = ref('/');
    const posts = ref(null);
    const suggested = ref(null);
    const following = ref(null);

    // Getters
    const getIsLoginOpen = computed(() => isLoginOpen.value);
    const getIsEditProfileOpen = computed(() => isEditProfileOpen.value);
    const getSelectedPost = computed(() => selectedPost.value);
    const getIds = computed(() => ids.value);
    const getIsBackUrl = computed(() => isBackUrl.value);
    const getPosts = computed(() => posts.value);
    const getSuggested = computed(() => suggested.value);
    const getFollowing = computed(() => following.value);

    // Methods
    const bodySwitch = (val) => {
      if (val) {
        document.documentElement.style.overflow = 'hidden';

        return;
      }

      document.documentElement.style.overflow = 'visible';
    };

    // Actions
    const setIsLoginOpen = (val) => {
      isLoginOpen.value = val;
    };

    const setIsEditProfileOpen = (val) => {
      isEditProfileOpen.value = val;
    };

    const hasSessionExpired = async () => {
      await $axios.interceptors.response.use(
        (response) => {
          //  Call was successful, continue.

          return response;
        },
        (error) => {
          switch (error.response.status) {
            case 401: // Not logged in
            case 419: // Session expired
            case 503: // Down for maintenance
              resetUser();

              window.location.href = '/';

              break;
            case 500:
              alert('Oops, something went wrong! The team has been notified.');
              break;
            default:
              // Allow individual requests to handle other errors
              return Promise.reject(error);
          }
        }
      );
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

      // Methods
      bodySwitch,

      // Actions
      setIsLoginOpen,
      setIsEditProfileOpen,
      hasSessionExpired,
    };
  },
  {
    persist: true,
  }
);

