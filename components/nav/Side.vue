<script setup>
import { storeToRefs } from 'pinia';

const { $generalStore } = useNuxtApp();

const { getSuggested, getFollowing } = storeToRefs($generalStore);

const route = useRoute();

const { isLoggedIn } = useUser();
</script>

<template>
  <div
    id="NavSide"
    :class="route.fullPath === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'"
    class="fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto"
  >
    <div class="lg:w-full w-[55px] mx-auto">
      <NuxtLink to="/">
        <MenuItem title="For You" color="#f02c56" :iconSize="30" />
      </NuxtLink>
      <MenuItem title="Following" color="#000000" :iconSize="27" />
      <MenuItem title="LIVE" color="#000000" :iconSize="27" />

      <div class="border-b lg:ml-2 mt-2" />

      <div
        class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2"
      >
        Suggested accounts
      </div>

      <div class="lg:block hidden pt-3" />

      <div v-if="getSuggested" v-for="sug in getSuggested" :key="sug.id">
        <div @click="() => isLoggedIn(sug)" class="cursor-pointer">
          <MenuItemFollow :user="sug" />
        </div>
      </div>

      <button class="lg:block hidden text-[#f02c56] pt-1.5 pl-2 text-[13px]">
        See all
      </button>

      <div class="lg:block hidden pt-3" />

      <div
        class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2"
      >
        Following accounts
      </div>

      <div class="lg:block hidden pt-3" />

      <div v-if="getFollowing" v-for="fol in getFollowing" :key="fol.id">
        <div @click="() => isLoggedIn(fol)" class="cursor-pointer">
          <MenuItemFollow :user="fol" />
        </div>
      </div>

      <button class="lg:block hidden text-[#f02c56] pt-1.5 pl-2 text-[13px]">
        See all
      </button>

      <div class="lg:block hidden border-b lg:ml-2 mt-2" />

      <div class="lg:block hidden text-[11px] text-gray-500">
        <p class="pt-4 px-2">About Newsroom Contact Careers ByteDance</p>
        <p class="pt-4 px-2">
          TikTok for Good Advertise Developers Transparency TikTok Rewards
          TikTok Embeds
        </p>
        <p class="pt-4 px-2">
          Help Safety Terms Privacy Creator Portal Community Guidelines
        </p>
        <p class="pt-4 px-2">© 2023 TikTok</p>
      </div>

      <div class="pb-14"></div>
    </div>
  </div>
</template>

