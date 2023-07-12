<script setup>
definePageMeta({
  layout: 'default',
});
</script>

<template>
  <div
    class="pt-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 pr-2 w-[calc(100%-90px)] max-w-[1800px] 2xl:mx-auto"
  >
    <div class="flex w-[calc(100vw-230px)]">
      <img
        class="max-w-[120px] rounded-full"
        src="https://picsum.photos/id/8/300/320"
        alt=""
      />

      <div class="ml-5 w-full">
        <h1 class="text-[30px] font-bold truncate">User name</h1>
        <p class="text-[15px] truncate">User name</p>

        <BaseButton class="mt-3" v-if="true" size="small" color="white">
          <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
          <span>Edit profile</span>
        </BaseButton>

        <BaseButton v-else class="mt-3" size="small">
          <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
          <span>Follow</span>
        </BaseButton>
      </div>
    </div>

    <div class="flex items-center pt-4">
      <div class="mr-4">
        <span class="font-bold">10K</span>
        <span class="font-light text-gray-500 text-[15px] pl-1.5"
          >Following</span
        >
      </div>

      <div class="mr-4">
        <span class="font-bold">44K</span>
        <span class="font-light text-gray-500 text-[15px] pl-1.5"
          >Followers</span
        >
      </div>

      <div class="mr-4">
        <span class="font-bold">3K</span>
        <span class="font-light text-gray-500 text-[15px] pl-1.5">Likes</span>
      </div>
    </div>

    <div
      class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]"
    >
      This is the bio section
    </div>

    <div class="w-full flex items-center pt-4 border-b">
      <div
        class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black"
      >
        Videos
      </div>
      <div
        class="w-60 text-center py-2 text-[17px] text-gray-500 font-semibold"
      >
        <Icon class="mb-0.5" name="material-symbols:lock-open" /> Liked
      </div>
    </div>

    <div
      class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
    >
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
      <PostUser />
    </div>
  </div>
</template>

