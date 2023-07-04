<script setup>
const route = useRoute();

const showMenu = ref(false);
</script>

<template>
  <header
    id="NavTop"
    class="fixed bg-white z-30 flex items-center w-full border-b h-[61px]"
  >
    <div
      :class="route.fullPath === '/' ? 'max-w-[1150px]' : ''"
      class="flex items-center justify-between w-full px-6 mx-auto"
    >
      <div :class="route.fullPath === '/' ? 'w-[80%]' : 'lg:w-[20%] w-[70%]'">
        <NuxtLink to="/">
          <BaseLogo mode="dark" />
        </NuxtLink>
      </div>

      <div
        class="hidden md:flex items-center bg-[#f1f1f2] p-1 rounded-full max-w-[380px] w-full"
      >
        <input
          type="text"
          placeholder="Search account"
          class="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
        />

        <div class="px-3 py-1 flex items-center border-l border-l-gray-300">
          <Icon name="ri:search-line" color="#a1a2a7" size="22" />
        </div>
      </div>

      <div
        class="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full"
      >
        <BaseButton color="white" size="small">
          <Icon name="mdi:plus" color="#000000" size="22" />
          <span class="px-2 font-medium text-[15px]">Upload</span>
        </BaseButton>

        <div v-if="false" class="flex items-center">
          <BaseButton class="mt-8" @click="() => console.log('hello')">
            <span class="mx-4 font-medium text-[15px]">Log in</span>
          </BaseButton>

          <Icon name="mdi:dots-vertical" color="#161724" size="25" />
        </div>

        <div class="flex items-center">
          <Icon
            class="ml-1 mr-4"
            name="carbon:send-alt"
            color="#161724"
            size="30"
          />
          <Icon
            class="mr-5"
            name="bx:message-detail"
            color="#161724"
            size="27"
          />

          <div class="relative">
            <button @click="($event) => (showMenu = !showMenu)" class="mt-1">
              <img
                width="33"
                src="https://picsum.photos/id/83/300/320"
                alt=""
                class="rounded-full"
              />
            </button>

            <div
              v-if="showMenu"
              id="PopupMenu"
              class="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
            >
              <NuxtLink
                @click="($event) => (showMenu = false)"
                class="flex items-center justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
              >
                <Icon name="ph:user" size="20" />
                <span class="pl-2 font-semibold text-sm">Profile</span>
              </NuxtLink>

              <div
                class="flex items-center justify-start py-3 px-1.5 hover:bg-gray-100 borer-t cursor-pointer"
              >
                <Icon name="ic:outline-login" size="20" />
                <span class="pl-2 font-semibold text-sm">Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

