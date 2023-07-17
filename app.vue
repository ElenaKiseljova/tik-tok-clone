<script setup>
import { storeToRefs } from 'pinia';

const { $generalStore } = useNuxtApp();
const { getIsLoginOpen, getIsEditProfileOpen } = storeToRefs($generalStore);
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

