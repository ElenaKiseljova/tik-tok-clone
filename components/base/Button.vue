<script setup>
const { size, color } = defineProps({
  size: {
    type: String,
    required: false,
    default: 'small',
    validator(value) {
      // The value must match one of these strings
      return ['small', 'medium', 'big'].includes(value);
    },
  },
  color: {
    type: String,
    required: false,
    default: 'red',
    validator(value) {
      // The value must match one of these strings
      return ['red', 'white'].includes(value);
    },
  },
});
</script>

<template>
  <button
    :class="{
      'px-10 py-2.5 rounded-sm text-[16px]': size === 'big',
      'px-8 py-1.5 text-[15px] rounded-sm': size === 'medium',
      'rounded-md px-3 py-[6px] text-[15px]': size === 'small',
      'text-white bg-[#f02c56]': color === 'red',
      'hover:bg-gray-100': color === 'white',
    }"
    class="flex items-center justify-center border"
  >
    <slot />
  </button>
</template>

