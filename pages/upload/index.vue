<script setup>
definePageMeta({
  layout: 'upload',
});
</script>

<template>
  <div
    class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4"
  >
    <div class="">
      <div class="text-[23px] font-semibold">Upload video</div>
      <div class="text-gray-400 mt-1">Post a video to your account</div>
    </div>

    <div class="mt-8 md:flex gap-6">
      <label
        v-if="false"
        for="fileInput"
        class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
        <div class="mt-4 text-[17px]">Select video to upload</div>
        <div class="mt-1.5 text-gray-500 text-[13px]">
          Or drag and drop a file
        </div>
        <div class="mt-12 text-gray-400 text-sm">MP4</div>
        <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
        <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>

        <BaseButton class="mt-8 w-[80%]" size="medium">
          Select file
        </BaseButton>
        <input
          ref="file"
          type="file"
          hidden
          name=""
          id="fileInput"
          accept=".mp4"
        />
      </label>

      <div
        v-else
        class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative"
      >
        <div class="bg-black h-full w-full" />

        <img
          class="absolute z-20 pointer-events-none"
          src="~/assets/images/mobile-case.png"
          alt="mobile"
        />

        <BaseLogo mode="white" class="absolute right-4 bottom-6 z-20" />

        <video
          muted
          loop
          autoplay
          class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
          src="/flowers.mp4"
        />

        <div
          class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-200"
        >
          <div class="flex items-center truncate">
            <Icon
              name="clarity:success-standard-line"
              size="16"
              class="min-w-[16px]"
            />
            <h6 class="text-[11px] pl-1 truncate text-ellipsis">video name</h6>
          </div>

          <button class="text-[11px] ml-2 font-semibold">Change</button>
        </div>
      </div>

      <div class="mt-4 mb-6">
        <div class="flex bg-[#f8f8f8] py-4 px-6">
          <div class="">
            <Icon name="mdi:box-cutter-off" size="20" class="mr-4" />
          </div>

          <div class="">
            <p class="text-semibold text-[15px] mb-1.5">
              Divide videos and edit
            </p>
            <p class="text-semibold text-[13px] text-gray-400">
              You can quickly divide videos into multiple parts, remove
              redundant psrts and turn landscapevideos into portrait videos
            </p>
          </div>
          <div
            class="flex justify-end max-w-[130px] w-full h-full text-center my-auto"
          >
            <BaseButton size="medium"> Edit </BaseButton>
          </div>
        </div>

        <div class="mt-5">
          <div class="flex items-center justify-between">
            <div class="mb-1 text-[15px]">Caption</div>
            <div class="text-gray-400 text-[12px]">0/150</div>
          </div>

          <input
            class="w-full border p-2.5 rounded-md focus:outline-none"
            maxlength="150"
            type="text"
          />
        </div>

        <div class="flex gap-3">
          <button
            class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
          >
            Discard
          </button>

          <BaseButton
            size="big"
            class="mt-8"
            @click="() => console.log('hello')"
          >
            Post
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

