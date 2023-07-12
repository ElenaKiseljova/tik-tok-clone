<script setup>
const video = ref(null);

onMounted(() => {
  video.value.play();
});
</script>

<template>
  <div class="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
    Video
  </div>
</template>

