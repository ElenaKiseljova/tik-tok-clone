<script setup>
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref(null);
</script>

<template>
  <h3 class="text-center text-[28px] mb-4 font-bold">Sign up</h3>

  <label for="input-Full name" class="px-6 pb-1.5 text-[15px]">Full name</label>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Full name"
      v-model:input="name"
      type="text"
      :autoFocus="true"
      error=""
    />
  </div>

  <label for="input-Email address" class="px-6 pb-1.5 text-[15px]"
    >Email address</label
  >
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Email address"
      v-model:input="email"
      type="email"
      error=""
    />
  </div>

  <label for="input-Password" class="px-6 pb-1.5 text-[15px]">Password</label>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Password"
      v-model:input="password"
      type="password"
      error=""
    />
  </div>

  <label for="input-Confirm Password" class="px-6 pb-1.5 text-[15px]"
    >Confirm Password</label
  >
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Confirm Password"
      v-model:input="confirmPassword"
      type="password"
      error=""
    />
  </div>

  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!name || !email || !password || !confirmPassword"
      :class="
        !name || !email || !password || !confirmPassword
          ? 'bg-gray-200'
          : 'bg-[#f02c56]'
      "
      @click="() => register()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
    </button>
  </div>
</template>

