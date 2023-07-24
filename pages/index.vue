<script setup>
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'default',
});

const { $generalStore } = useNuxtApp();

const { getAllUsersAndPosts } = $generalStore;

const { getPosts } = storeToRefs($generalStore);

onMounted(async () => {
  try {
    await getAllUsersAndPosts();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
    <div v-for="post in getPosts" :key="post.id">
      <PostMain v-if="post" :post="post" />
    </div>
  </div>
</template>

