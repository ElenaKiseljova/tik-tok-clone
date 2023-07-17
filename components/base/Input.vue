<script setup>
const emits = defineEmits(['update:input']);

const props = defineProps({
  input: {
    type: [String, Number],
    required: true,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
    validator(value) {
      // The value must match one of these strings
      return ['text', 'tel', 'email', 'number', 'password', 'date'].includes(
        value
      );
    },
  },
  placeholder: {
    type: String,
    required: false,
    default: Date.now(),
  },
  max: {
    type: Number,
    required: false,
    default: undefined,
  },
  autoFocus: {
    type: Boolean,
    required: false,
    default: false,
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
});

const { input, placeholder, type, max, autoFocus, error } = toRefs(props);

const inputRef = ref(null);

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emits('update:input', val),
});

onMounted(() => {
  if (autoFocus.value && inputRef) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div>
    <input
      ref="inputRef"
      :id="`input-${placeholder}`"
      :placeholder="placeholder"
      :type="type"
      v-model="inputComputed"
      :maxlength="max"
      autocomplete="off"
      class="block w-full bg-[#f1f1f2] text-gray-600 rounded-md py-2.5 px-3 focus:outline-none"
    />

    <span v-if="error" class="text-red-500 text-[14px] font-semibold">
      {{ error }}
    </span>
  </div>
</template>

