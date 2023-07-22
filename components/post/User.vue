<script setup>
const props = defineProps(['post']);

const { $generalStore } = useNuxtApp();

const { setBackUrl, setSelectedPost } = $generalStore;

const route = useRoute();
const router = useRouter();

const video = ref(null);
const videoSrc = ref('');
const isLoaded = ref(false);

onMounted(() => {
  if (video.value) {
    videoSrc.value = props.post.video;

    video.value.addEventListener('loadeddata', (evt) => {
      if (evt.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 200);
      }
    });
  }
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;

  videoSrc.value = '';
});

const isHover = (bool) => {
  if (bool) {
    video.value.play();
  } else {
    video.value.pause();
  }
};

const displayPost = (post) => {
  setBackUrl(`/profile/${route.params.id}`);
  setSelectedPost(null);

  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 300);
};
</script>

<template>
  <div
    @click="() => displayPost(post)"
    @mouseenter="() => isHover(true)"
    @mouseleave="() => isHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded bg-black"
    >
      <Icon
        class="animate-spin ml-1"
        name="mingcute:loading-line"
        size="100"
        color="#ffffff"
      />
    </div>

    <div class="">
      <video
        ref="video"
        muted
        loop
        :src="videoSrc"
        class="aspect-[3/4] object-cover rounded-md"
      />
    </div>

    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        {{ post.text }}
      </div>

      <div class="flex items-center -ml-1 text-gray-600 font-bold text-xs">
        <Icon name="gg:loadbar-sound" size="20" />
        3%
        <Icon class="ml-1" name="tabler:alert-circle" size="16" />
      </div>
    </div>
  </div>
</template>

