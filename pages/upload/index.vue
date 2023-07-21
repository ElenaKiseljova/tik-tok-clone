<script setup>
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'upload',
});

const router = useRouter();

const { $userStore } = useNuxtApp();

const { getId } = storeToRefs($userStore);

const { createPost } = $userStore;

const file = ref(null);
const fileDisplay = ref(null);
const errorType = ref(null);
const caption = ref('');
const fileData = ref(null);
const errors = ref(null);
const isUploading = ref(false);

watch(caption, (c) => {
  if (c.length >= 150) {
    errorType.value = 'caption';

    return;
  }

  errorType.value = null;
});

const dropHandler = (evt) => {
  errorType.value = '';

  const fileRaw = evt.dataTransfer.files[0];

  file.value = fileRaw;
  fileData.value = fileRaw;

  const extension = fileRaw.name.substring(fileRaw.name.lastIndexOf('.') + 1);

  if (extension !== 'mp4') {
    errorType.value = 'file';

    return;
  }

  fileDisplay.value = URL.createObjectURL(fileRaw);
};

const changeHandler = () => {
  const fileRaw = file.value.files[0];

  fileData.value = fileRaw;

  fileDisplay.value = URL.createObjectURL(fileRaw);
};

const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};

const discardHandler = () => {
  clearVideo();

  caption.value = '';
};

const createPostHandler = async () => {
  errors.value = null;

  const data = new FormData();

  data.append('video', fileData.value);
  data.append('text', caption.value || '');

  if (fileData.value && caption.value) {
    isUploading.value = true;
  }

  try {
    const res = await createPost(data);

    if (res.status === 200) {
      setTimeout(() => {
        router.push(`/profile/${getId.value}`);

        isUploading.value = false;
      }, 1000);
    }
  } catch (error) {
    errors.value = error.response?.data.errors;

    isUploading.value = false;
  }
};
</script>

<template>
  <div
    class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4"
  >
    <UploadError :errorType="errorType" />

    <div
      v-if="isUploading"
      class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50"
    >
      <Icon
        class="animate-spin ml-1"
        name="mingcute:loading-line"
        size="100"
        color="#ffffff"
      />
    </div>

    <div class="">
      <div class="text-[23px] font-semibold">Upload video</div>
      <div class="text-gray-400 mt-1">Post a video to your account</div>
    </div>

    <div class="mt-8 md:flex gap-6">
      <label
        v-if="!fileDisplay"
        for="fileInput"
        @drop.prevent="dropHandler"
        @dragover.prevent=""
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

        <BaseButton class="mt-8 w-[80%] pointer-events-none" size="medium">
          Select file
        </BaseButton>
        <input
          ref="file"
          type="file"
          hidden
          name=""
          id="fileInput"
          accept=".mp4"
          @change="changeHandler"
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
          :src="fileDisplay"
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
            <h6 class="text-[11px] pl-1 truncate text-ellipsis">
              {{ fileData.name }}
            </h6>
          </div>

          <button @click="clearVideo" class="text-[11px] ml-2 font-semibold">
            Change
          </button>
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
            <div class="text-gray-400 text-[12px]">
              {{ caption.length }}/150
            </div>
          </div>

          <input
            v-model="caption"
            class="w-full border p-2.5 rounded-md focus:outline-none"
            maxlength="150"
            type="text"
          />
        </div>

        <div class="flex gap-3">
          <button
            @click="discardHandler"
            class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
          >
            Discard
          </button>

          <BaseButton
            size="big"
            class="mt-8"
            @click="() => createPostHandler()"
          >
            Post
          </BaseButton>
        </div>
        <div v-if="errors" class="mt-4">
          <p v-if="errors && errors.video" class="text-red-600">
            {{ errors.video[0] }}
          </p>
          <p v-if="errors && errors.text" class="text-red-600">
            {{ errors.text[0] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

