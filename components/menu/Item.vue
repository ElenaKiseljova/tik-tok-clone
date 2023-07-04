<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#000000',
    required: false,
  },
  iconSize: {
    type: Number,
    default: 27,
    required: false,
  },
});

const icon = ref('');

if (title === 'For You') {
  icon.value = 'mdi:home';
}

if (title === 'Following') {
  icon.value = 'ci:group';
}

if (title === 'LIVE') {
  icon.value = 'ri:live-line';
}
</script>

<template>
  <div class="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
    <div class="flex items-center lg:mx-0 mx-auto">
      <Icon :name="icon" :color="color" :size="iconSize.toString()" />

      <span
        :class="`text-[${color}]`"
        class="lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px]"
      >
        {{ title }}
      </span>
    </div>
  </div>
</template>

