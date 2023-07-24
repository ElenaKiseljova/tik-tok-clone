<script setup>
import { storeToRefs } from 'pinia';

const { $userStore, $generalStore, $profileStore } = useNuxtApp();

const { addComment, deleteComment, deletePost } = $userStore;
const { getId } = storeToRefs($userStore);

const { setSelectedPost, getPostById, allLowerCaseNoCaps } = $generalStore;
const { getSelectedPost, getIsBackUrl, getIds } = storeToRefs($generalStore);

const { getProfile } = $profileStore;

const route = useRoute();
const router = useRouter();

const { isLiked, likePost, unlikePost } = useUser(getSelectedPost);

const videoRef = ref(null);
const commentsRef = ref(null);

const videoSrc = ref('');
const isLoaded = ref(false);
const comment = ref('');
const inputFocused = ref(false);

watch(isLoaded, () => {
  if (isLoaded.value) {
    setTimeout(() => {
      videoRef.value.play();
    }, 500);
  }
});

const loopThroughPostsDown = () => {
  setTimeout(() => {
    const idArrayReversed = [...getIds.value].reverse();

    let isBreak = false;

    for (let i = 0; i < idArrayReversed.length; i++) {
      const id = idArrayReversed[i];

      if (Number(id) < Number(route.params.id)) {
        router.push(`/post/${id}`);
        isBreak = true;

        return;
      }
    }

    if (!isBreak) {
      router.push(`/post/${idArrayReversed[0]}`);
    }
  }, 300);
};

const loopThroughPostsUp = () => {
  setTimeout(() => {
    let isBreak = false;

    for (let i = 0; i < getIds.value.length; i++) {
      const id = getIds.value[i];

      if (Number(id) > Number(route.params.id)) {
        router.push(`/post/${id}`);
        isBreak = true;

        return;
      }
    }

    if (!isBreak) {
      router.push(`/post/${getIds.value[0]}`);
    }
  }, 300);
};

const deletePostHandler = async () => {
  const res = confirm('Are You sure You want to delete this post?');

  try {
    if (res) {
      await deletePost(getSelectedPost.value);
      await getProfile(getId);

      router.push(`/profile/${getId.value}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const addCommentHandler = async () => {
  try {
    await addComment(getSelectedPost.value, comment.value);

    comment.value = null;

    commentsRef.value?.scroll({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.log(error);
  }
};

const deleteCommentHandler = async (post, commentId) => {
  const res = confirm('Are You sure You want to delete this comment?');

  try {
    if (res) {
      await deleteComment(post, commentId);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  setSelectedPost(null);

  try {
    await getPostById(route.params.id);

    videoSrc.value = getSelectedPost.value?.video;

    videoRef.value.addEventListener('loadeddata', (evt) => {
      if (evt.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 500);
      }
    });
  } catch (error) {
    if (error?.response?.status === 400) {
      router.push('/');
    }
  }
});

onBeforeUnmount(() => {
  videoRef.value.pause();
  videoRef.value.currentTime = 0;

  videoSrc.value = '';
});
</script>

<template>
  <div
    class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
  >
    <div class="lg:w-[calc(100%-540px)] h-full relative">
      <NuxtLink
        :to="getIsBackUrl"
        class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
      >
        <Icon name="material-symbols:close" color="#ffffff" size="27" />
      </NuxtLink>

      <div v-if="getIds?.length > 0" class="">
        <button
          :disabled="!isLoaded"
          @click="() => loopThroughPostsUp()"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" size="30" color="#ffffff" />
        </button>

        <button
          :disabled="!isLoaded"
          @click="() => loopThroughPostsDown()"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-down" size="30" color="#ffffff" />
        </button>
      </div>

      <BaseLogo
        class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        mode="small"
      />

      <video
        v-if="getSelectedPost?.video"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        :src="videoSrc"
      />

      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon
          class="animate-spin ml-1"
          name="mingcute:loading-line"
          size="100"
          color="#ffffff"
        />
      </div>

      <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          v-if="getSelectedPost?.video"
          ref="videoRef"
          loop
          muted
          class="h-screen mx-auto"
          :src="videoSrc"
        />
      </div>
    </div>

    <div
      id="InfoSection"
      v-if="getSelectedPost"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7" />

      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <NuxtLink :to="`/profile/${getSelectedPost?.user?.id}`">
            <img
              class="rounded-full lg:mx-0 mx-auto"
              width="40"
              :src="getSelectedPost?.user?.image"
              :alt="getSelectedPost?.user?.name"
            />
          </NuxtLink>

          <div class="ml-3 pt-0.5">
            <h4 class="text-[17px] font-semibold">
              {{ allLowerCaseNoCaps(getSelectedPost?.user?.name) }}
            </h4>
            <div class="text-[13px] -mt-5 font-light">
              {{ getSelectedPost?.user?.name }}
              <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
              <span class="font-medium">{{ getSelectedPost?.created_at }}</span>
            </div>
          </div>
        </div>

        <Icon
          v-if="getId === getSelectedPost?.user?.id"
          @click="() => deletePostHandler()"
          class="cursor-pointer"
          name="material-symbols:delete-outline-sharp"
          size="25"
        />
      </div>

      <div class="px-8 mt-4 text-sm">{{ getSelectedPost?.text }}</div>

      <div class="px-8 mt-4 text-sm font-bold">
        <Icon name="mdi:music" size="17" />
        original sound - {{ allLowerCaseNoCaps(getSelectedPost?.user?.name) }}
      </div>

      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button
            @click="
              () =>
                isLiked
                  ? unlikePost(getSelectedPost, true)
                  : likePost(getSelectedPost, true)
            "
            class="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            <Icon
              name="mdi:heart"
              size="25"
              :color="isLiked ? '#f02c56' : ''"
            />
          </button>

          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ getSelectedPost?.likes?.length }}
          </span>
        </div>

        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>

          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ getSelectedPost?.comments?.length }}
          </span>
        </div>
      </div>

      <div
        ref="commentsRef"
        id="Comments"
        class="bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2" />

        <div
          v-if="getSelectedPost?.comments?.length < 1"
          class="text-center mt-6 text-xl text-gray-500"
        >
          No comments...
        </div>

        <div
          v-else
          v-for="comment in getSelectedPost?.comments"
          :key="comment.id"
          class="flex items-center justify-between px-8 mt-4"
        >
          <div class="flex items-center relative w-full">
            <NuxtLink :to="`/profile/${comment.user.id}`">
              <img
                class="absolute top-0 rounded-full lg:mx-0 mx-auto"
                width="40"
                :src="comment.user.image"
                :alt="comment.user.name"
              />
            </NuxtLink>
            <div class="ml-14 pt-0.5 w-full">
              <div
                class="text-[18px] font-semibold flex items-center justify-between"
              >
                {{ comment.user.name }}
                <Icon
                  v-if="getId === comment.user.id"
                  @click="
                    () => deleteCommentHandler(getSelectedPost, comment.id)
                  "
                  class="cursor-pointer"
                  name="material-symbols:delete-outline-sharp"
                  size="25"
                />
              </div>

              <div class="text-[15px] font-light">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-28" />
      </div>

      <div
        id="CreateComment"
        v-if="getId"
        class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#f1f1f2]'
          "
          class="bg-[#f1f1f2] flex items-center rounded-lg w-full lg:max-w-[420px]"
        >
          <input
            v-model="comment"
            @focus="() => (inputFocused = true)"
            @blur="() => (inputFocused = false)"
            class="bg-[#f1f1f2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            placeholder="Add comment..."
            type="text"
          />
        </div>

        <button
          :disabled="!comment"
          @click="() => addCommentHandler()"
          :class="comment ? 'text-[#f02c56] cursor-pointer' : 'text-gray-400'"
          class="font-semibold text-sm ml-5 pr-1"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

