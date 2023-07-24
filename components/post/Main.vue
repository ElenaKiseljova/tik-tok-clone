<script setup>
const { $generalStore, $userStore } = useNuxtApp();

const { allLowerCaseNoCaps } = $generalStore;

const props = defineProps(['post']);

const { post } = toRefs(props);

const router = useRouter();

const { isLoggedIn, displayPost, likePost, unlikePost, isLiked } =
  useUser(post);

const postRef = ref(null);
const videoRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const cur = entries[0];

      if (cur?.isIntersecting) {
        // console.log(`Element is palying ${post.value.id}`);

        videoRef.value?.play();
      } else {
        // console.log(`Element is paused ${post.value.id}`);

        videoRef.value?.pause();
      }
    },
    {
      threshold: [0.6],
    }
  );

  if (postRef.value) {
    observer.observe(postRef.value);
  }
});

onBeforeUnmount(() => {
  videoRef.value.pause();
  videoRef.value.currentTime = 0;
  videoRef.value.src = '';
});
</script>

<template>
  <div ref="postRef" class="flex border-b py-6">
    <div @click="() => isLoggedIn(post?.user)" class="cursor-pointer">
      <div class="w-[60px] h-[60px] shrink-0">
        <img
          class="rounded-full w-full h-full object-cover object-center"
          :src="post?.user?.image"
          :alt="post?.user?.name"
          width="60"
        />
      </div>
    </div>

    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button @click="() => isLoggedIn(post?.user)">
          <span class="font-bold hover:underline cursor-pointer">
            {{ allLowerCaseNoCaps(post?.user?.name ?? '') }}
          </span>
          <span
            class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer"
          >
            {{ post?.user?.name }}
          </span>
        </button>

        <button
          class="border text-[15px] px-5 py-0.5 border-[#f02c56] text-[#f02c56] hover:bg-[#ffeef2] font-semibold rounded-md"
        >
          Follow
        </button>
      </div>

      <div
        class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]"
      >
        {{ post?.text }}
      </div>

      <div class="text-[14px] text-gray-500 pb-0.5">
        #fun #cool #SuperAwesome
      </div>

      <div class="text-[14px] flex items-center font-semibold pb-0.5">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>

      <div class="mt-2.5 flex">
        <div
          @click="() => displayPost(post)"
          class="relative min-h-[480px] max-h-[580px] max-w-[260px] flexx items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            ref="videoRef"
            muted
            loop
            class="rounded-xl object-cover mx-auto h-full"
            :src="post?.video"
          />

          <BaseLogo mode="white" class="absolute right-2 bottom-14" />
        </div>

        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button
                @click="() => (isLiked ? unlikePost(post) : likePost(post))"
                class="rounded-full bg-gray-200 p-2 cursor-pointer"
              >
                <Icon
                  name="mdi:heart"
                  size="25"
                  :color="isLiked ? '#f02c56' : ''"
                />
              </button>

              <span class="text-xs text-gray-800 font-semibold">{{
                post?.likes?.length
              }}</span>
            </div>

            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="bx:bxs-message-rounded-dots" size="25" />
              </button>

              <span class="text-xs text-gray-800 font-semibold">{{
                post?.comments?.length
              }}</span>
            </div>

            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="ri:share-forward-fill" size="25" />
              </button>

              <span class="text-xs text-gray-800 font-semibold">34</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

