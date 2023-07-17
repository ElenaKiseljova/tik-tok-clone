<script setup>
const isRegister = ref(true);
</script>

<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
      <div class="w-full flex justify-end">
        <button class="p-1.5 rounded-full bg-gray-100">
          <Icon name="mdi:close" size="26" />
        </button>
      </div>

      <AuthLogin v-if="isRegister" />
      <AuthRegister v-else />

      <div
        class="absolute flex items-center justify-center py-5 left-0 blur-0 border-t w-full"
      >
        <span class="text-[14px] text-gray-600">
          {{
            isRegister
              ? "Don't have an account?"
              : 'Do You already have an account?'
          }}
        </span>

        <button
          @click="() => (isRegister = !isRegister)"
          class="text-[14px] text-[#f02c56] font-semibold pl-1"
        >
          {{ isRegister ? 'Sign up' : 'Log in' }}
        </button>
      </div>
    </div>
  </div>
</template>

