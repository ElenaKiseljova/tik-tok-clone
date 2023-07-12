<script setup>
const { mode } = defineProps({
  mode: {
    type: String,
    required: false,
    default: 'dark',
    validator(value) {
      // The value must match one of these strings
      return ['white', 'dark', 'small'].includes(value);
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
    v-else-if="mode === 'dark'"
    width="115"
    src="~/assets/images/tiktok-logo.png"
    alt="Tik-Tok logo"
  />

  <img
    v-else
    src="~/assets/images/tiktok-logo-small.png"
    alt="Tik-Tok logo"
    width="45"
  />
</template>

