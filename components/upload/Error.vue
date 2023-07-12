<script setup>
const props = defineProps({
  errorType: {
    type: String,
    required: false,
  },
});

const error = ref('');

const { errorType } = toRefs(props);

watch(errorType, () => {
  if (errorType.value === 'caption') {
    error.value = 'Maximum 150 characters.';
  } else if (errorType.value === 'bio') {
    error.value = 'Maximum 80 characters.';
  } else if (errorType.value === 'file') {
    error.value = 'Unsupported file. Use MP4 instead.';
  } else {
    error.value = '';
  }
});
</script>

<template>
  <div class="w-full relative flex justify-center">
    <div
      :class="errorType ? 'visible' : 'invisible'"
      class="absolute top-6 z-50 mx-auto bg-black bg-opacity-70 text-white px-14 py-3 rounded-sm"
    >
      {{ error }}
    </div>
  </div>
</template>

