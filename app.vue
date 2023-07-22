<script setup>
import { storeToRefs } from 'pinia';

const { $generalStore, $userStore } = useNuxtApp();
const { getIsLoginOpen, getIsEditProfileOpen } = storeToRefs($generalStore);
const { id } = storeToRefs($userStore);

const {
  hasSessionExpired,
  getRandomUsers,
  bodySwitch,
  setIsLoginOpen,
  setIsEditProfileOpen,
} = $generalStore;
const { getUser } = $userStore;

watch(getIsLoginOpen, (val) => {
  bodySwitch(val);
});

watch(getIsEditProfileOpen, (val) => {
  bodySwitch(val);
});

onMounted(async () => {
  bodySwitch(false);

  setIsLoginOpen(false);
  setIsEditProfileOpen(false);

  try {
    await hasSessionExpired();
    await getRandomUsers('suggested');
    await getRandomUsers('following');

    if (id.value) {
      getUser();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <Head>
    <title>TikTok [clone]</title>
  </Head>

  <NuxtLayout>
    <NuxtPage />

    <AuthOverlay v-if="getIsLoginOpen" />
    <ProfileEditOverlay v-if="getIsEditProfileOpen" />
  </NuxtLayout>
</template>

