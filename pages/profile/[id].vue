<script setup>
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

const { $userStore, $profileStore, $generalStore } = useNuxtApp();

const { getId: userId } = storeToRefs($userStore);

const { getProfile } = $profileStore;

const {
  getPosts,
  getImage,
  getName,
  getBio,
  getId: profileId,
  getAllLikes,
} = storeToRefs($profileStore);

const { setIsEditProfileOpen, allLowerCaseNoCaps } = $generalStore;

const route = useRoute();

const isShow = ref(false);

watch(getPosts, () => {
  setTimeout(() => {
    isShow.value = true;
  }, 300);
});

onMounted(async () => {
  try {
    await getProfile(route.params.id);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div
    v-if="getName"
    class="pt-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 pr-2 w-[calc(100%-90px)] max-w-[1800px] 2xl:mx-auto"
  >
    <div class="flex w-[calc(100vw-230px)]">
      <img class="max-w-[120px] rounded-full" :src="getImage" :alt="getName" />

      <div class="ml-5 w-full">
        <h1 class="text-[30px] font-bold truncate">
          {{ allLowerCaseNoCaps(getName) }}
        </h1>
        <p class="text-[15px] truncate">{{ getName }}</p>

        <BaseButton
          v-if="profileId === userId"
          @click="() => setIsEditProfileOpen(true)"
          class="mt-3"
          size="small"
          color="white"
        >
          <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
          <span>Edit profile</span>
        </BaseButton>

        <BaseButton v-else class="mt-3" size="small">
          <Icon class="mt-0.5 mr-1" name="mdi:plus" size="18" />
          <span>Follow</span>
        </BaseButton>
      </div>
    </div>

    <div class="flex items-center pt-4">
      <div class="mr-4">
        <span class="font-bold">10K</span>
        <span class="font-light text-gray-500 text-[15px] pl-1.5"
          >Following</span
        >
      </div>

      <div class="mr-4">
        <span class="font-bold">44K</span>
        <span class="font-light text-gray-500 text-[15px] pl-1.5"
          >Followers</span
        >
      </div>

      <div class="mr-4">
        <span class="font-bold">{{ getAllLikes }}</span>
        <span class="font-light text-gray-500 text-[15px] pl-1.5">Likes</span>
      </div>
    </div>

    <div
      class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]"
    >
      {{ getBio }}
    </div>

    <div class="w-full flex items-center pt-4 border-b">
      <div
        class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black"
      >
        Videos
      </div>
      <div
        class="w-60 text-center py-2 text-[17px] text-gray-500 font-semibold"
      >
        <Icon class="mb-0.5" name="material-symbols:lock-open" /> Liked
      </div>
    </div>

    <div
      class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
    >
      <div v-if="isShow" v-for="post in getPosts" :key="post.id">
        <PostUser v-if="post" :post="post" />
      </div>
    </div>
  </div>
</template>

