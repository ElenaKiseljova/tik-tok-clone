import { storeToRefs } from 'pinia';

export const useUserAndPost = (post) => {
  const { $generalStore, $userStore } = useNuxtApp();

  const { setIsLoginOpen, setBackUrl, setSelectedPost } = $generalStore;

  const { getId } = storeToRefs($userStore);
  const { likePost: userLikePost, unlikePost: userUnlikePost } = $userStore;

  const router = useRouter();

  const isLiked = computed(() => {
    return post?.value?.likes?.some((like) => like.user_id === getId.value);
  });

  const isLoggedIn = (user) => {
    if (!getId.value) {
      setIsLoginOpen(true);

      return;
    }

    setTimeout(() => {
      router.push(`/profile/${user?.id}`);
    }, 200);
  };

  const likePost = async (post) => {
    if (!getId.value) {
      setIsLoginOpen(true);

      return;
    }

    try {
      await userLikePost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const unlikePost = async (post) => {
    if (!getId.value) {
      setIsLoginOpen(true);

      return;
    }

    try {
      await userUnlikePost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const displayPost = (post) => {
    if (!getId.value) {
      setIsLoginOpen(true);

      return;
    }

    setBackUrl('/');
    setSelectedPost(null);

    setTimeout(() => {
      router.push(`/post/${post?.id}`);
    }, 200);
  };

  return {
    isLoggedIn,
    displayPost,
    likePost,
    unlikePost,
    isLiked,
  };
};

