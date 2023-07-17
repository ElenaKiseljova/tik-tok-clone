<script setup>
const email = ref('');
const password = ref('');
const errors = ref(null);
</script>

<template>
  <h3 class="text-center text-[28px] mb-4 font-bold">Log in</h3>

  <div class="px-6 pb-1.5 text-[15px]">Email address</div>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Email address"
      v-model:input="email"
      type="email"
      :autoFocus="true"
      error=""
    />
  </div>

  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Password"
      v-model:input="password"
      type="password"
      error=""
    />
  </div>

  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password"
      :class="!email || !password ? 'bg-gray-200' : 'bg-[#f02c56]'"
      @click="() => login()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Log in
    </button>
  </div>
</template>

