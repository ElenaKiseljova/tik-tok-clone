<script setup>
const route = useRoute();
</script>

<template>
  <NavTop />

  <div
    :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''"
    class="flex justify-between mx-auto w-full lg:px-2.5 px-0"
  >
    <div class="">
      <NavSide />
    </div>

    <slot />
  </div>
</template>

