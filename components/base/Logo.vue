<script setup>
const { mode } = defineProps({
  mode: {
    type: String,
    required: false,
    default: 'dark',
    validator(value) {
      // The value must match one of these strings
      return ['white', 'dark'].includes(value);
    },
  },
});
</script>

<template>
  <img
    v-if="mode === 'white'"
    src="~/assets/images/tiktok-logo-white.png"
    alt="Tik-Tok logo"
    width="90"
  />
  <img
    v-else
    width="115"
    src="~/assets/images/tiktok-logo.png"
    alt="Tik-Tok logo"
  />
</template>

