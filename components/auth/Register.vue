<script setup>
const { $userStore, $generalStore } = useNuxtApp();
const { getTokens, register, getUser } = $userStore;
const { setIsLoginOpen } = $generalStore;

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref(null);

const registerHandler = async () => {
  errors.value = null;

  try {
    await getTokens();
    await register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    await getUser();

    setIsLoginOpen(false);
  } catch (error) {
    errors.value = error.response?.data.errors;
  }
};
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
      :error="errors && errors.name ? errors.name[0] : ''"
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
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>

  <label for="input-Password" class="px-6 pb-1.5 text-[15px]">Password</label>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Password"
      v-model:input="password"
      type="password"
      :error="errors && errors.password ? errors.password[0] : ''"
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
      :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''"
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
      @click="() => registerHandler()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
    </button>
  </div>
</template>

