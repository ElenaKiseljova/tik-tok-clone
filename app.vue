<script setup>
import { storeToRefs } from 'pinia';

const { $generalStore } = useNuxtApp();
const { getIsLoginOpen, getIsEditProfileOpen } = storeToRefs($generalStore);

const { hasSessionExpired } = $generalStore;

onMounted(async () => {
  try {
    await hasSessionExpired();
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

