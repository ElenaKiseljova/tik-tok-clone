import { defineStore } from 'pinia';
import axios from '~/plugins/axios';
import { useGeneralStore } from '~/stores/general';

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

    const updateUser = async (userName, userBio) => {
      return await $axios.patch('/api/update-user', {
        name: userName,
        bio: userBio,
      });
    };

    const updateUserImage = async (data) => {
      return await $axios.post('/api/update-user-image', data);
    };

    const createPost = async (data) => {
      return await $axios.post('/api/posts', data);
    };

    const deletePost = async (post) => {
      return await $axios.delete(`/api/posts/${post.id}`);
    };

    const likePost = async (post, isPostPage) => {
      const res = await $axios.post('/api/likes', {
        post_id: post.id,
      });

      let singlePost = null;
      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = useGeneralStore().getPosts?.find((p) => p.id === post.id);
      }

      singlePost?.likes.push(res.data.like);
    };

    const unlikePost = async (post, isPostPage) => {
      let deleteLike = null;
      let singlePost = null;

      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = useGeneralStore().getPosts?.find((p) => p.id === post.id);
      }

      deleteLike = singlePost?.likes.find((like) => like.user_id === id.value);

      const { data } = await $axios.delete(`/api/likes/${deleteLike.id}`);

      if (singlePost && data) {
        const likes = singlePost.likes?.filter((l) => l.id !== data.like?.id);

        singlePost.likes = likes;
      }
    };

    const addComment = async (post, comment) => {
      const res = await $axios.post('/api/comments', {
        post_id: post.id,
        comment,
      });

      if (res.status === 200) {
        await updateComments(post);
      }
    };

    const deleteComment = async (post, commentId) => {
      const res = await $axios.delete(`/api/comments/${commentId}`, {
        post_id: post.id,
      });

      if (res.status === 200) {
        await updateComments(post);
      }
    };

    const updateComments = async (post) => {
      const { data } = await $axios.get(`/api/profiles/${post?.user?.id}`);

      data?.posts?.forEach((p) => {
        if (p.id === post.id) {
          useGeneralStore().setSelectedPost({
            ...useGeneralStore().getSelectedPost,
            comments: p.comments,
          });
        }
      });
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
      // Raw
      id,

      // Getters
      getId,
      getName,
      getEmail,
      getBio,
      getImage,

      // Methods
      resetUser,

      // Actions
      getTokens,
      login,
      register,
      getUser,
      updateUser,
      updateUserImage,
      logout,
      createPost,
      deletePost,
      likePost,
      unlikePost,
      addComment,
      deleteComment,
    };
  },
  {
    persist: true,
  }
);

