<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

import { storeToRefs } from 'pinia';

const { $userStore, $profileStore, $generalStore } = useNuxtApp();

const { getSuggested, getFollowing } = storeToRefs($generalStore);
const { setIsEditProfileOpen, updateSideMenuImage } = $generalStore;

const { getProfile } = $profileStore;

const { getName, getBio, getImage } = storeToRefs($userStore);
const { updateUser, updateUserImage, getUser } = $userStore;

const route = useRoute();

const uploadedImage = ref(null);
const file = ref(null);
const cropper = ref(null);
const userImage = ref(null);
const userName = ref(null);
const userBio = ref(null);
const isUpdated = ref(false);

watch(userName, () => {
  if (!userName.value || userName.value === getName.value) {
    isUpdated.value = false;
  } else {
    isUpdated.value = true;
  }
});

watch(userBio, () => {
  if (!userBio.value || userBio.value.length < 1) {
    isUpdated.value = false;
  } else {
    isUpdated.value = true;
  }
});

onMounted(() => {
  userName.value = getName.value;
  userBio.value = getBio.value;
  userImage.value = getImage.value;
});

const getUploadedImage = (evt) => {
  file.value = evt.target.files[0];
  uploadedImage.value = URL.createObjectURL(file.value);
};

const cropAndUpdateImage = async () => {
  const { coordinates } = cropper.value.getResult();

  const data = new FormData();

  data.append('image', file.value || '');

  data.append('height', coordinates.height || '');
  data.append('width', coordinates.width || '');
  data.append('left', coordinates.left || '');
  data.append('top', coordinates.top || '');

  try {
    await updateUserImage(data);
    await getUser();
    await getProfile(route.params.id);

    updateSideMenuImage(getSuggested.value, $userStore);
    updateSideMenuImage(getFollowing.value, $userStore);

    userImage.value = getImage.value;
    uploadedImage.value = null;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async () => {
  try {
    await updateUser(userName.value, userBio.value);
    await getUser();
    await getProfile(route.params.id);

    userName.value = getName.value;
    userBio.value = getBio.value;

    setTimeout(() => {
      setIsEditProfileOpen(false);
    }, 100);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div
    id="ProfileEditOverlay"
    class="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
  >
    <div
      :class="!uploadedImage ? 'h-[655px]' : 'h-[580px]'"
      class="relative bg-white w-full max-w-[700px] sm:h-[580px] h-[650px] mx-3 p-4 rounded-lg mb-10"
    >
      <div
        class="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300"
      >
        <h3 class="text-[22px] font-medium">Edit profile</h3>

        <button @click="() => setIsEditProfileOpen(false)" class="">
          <Icon name="mdi:close" size="25" />
        </button>
      </div>

      <div
        :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'"
        class="h-[calc(500px-200px)]"
      >
        <div v-if="!uploadedImage">
          <div
            id="ProfilePhotoSection"
            class="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
          >
            <h4
              class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:text-left text-center"
            >
              Profile photo
            </h4>

            <div class="flex items-center justify-center sm:-mt-6">
              <label for="image" class="relative cursor-pointer">
                <img
                  class="rounded-full"
                  width="95"
                  :src="getImage"
                  :alt="getName"
                />

                <div
                  class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px]"
                >
                  <Icon
                    class="-mt-1 ml-0.5"
                    name="ph:pencil-simple-line"
                    size="17"
                  />
                </div>
              </label>
              <input
                id="image"
                type="file"
                class="hidden"
                @change="getUploadedImage"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </div>

          <div
            id="UsernameSection"
            class="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full"
          >
            <ProfileEditTitle>Username</ProfileEditTitle>

            <div class="flex items-center justify-center sm:-mt-6">
              <div class="sm:w-[60%] w-full max-w-md">
                <BaseInput
                  placeholder="Username"
                  v-model:input="userName"
                  type="text"
                  :max="30"
                />

                <p class="text-[11px] text-gray-500 mt-4">
                  Username can only contain letters, numbers, underscores, and
                  periods. Changing your username will also change your profile
                  link.
                </p>
              </div>
            </div>
          </div>

          <div
            id="BioSection"
            class="flex flex-col sm:h-[120px] px-1.5 py-2 mt-2 w-full"
          >
            <ProfileEditTitle>Bio</ProfileEditTitle>
            <div class="flex items-center justify-center sm:-mt-6">
              <div class="sm:w-[60%] w-full max-w-md">
                <textarea
                  v-model="userBio"
                  maxlength="80"
                  cols="30"
                  rows="4"
                  class="resize-none w-full bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                ></textarea>

                <div v-if="userBio" class="text-[11px] text-gray-500">
                  {{ userBio.length }}/80
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="w-full h-[430px]">
          <Cropper
            ref="cropper"
            :stencil-component="CircleStencil"
            :src="uploadedImage"
            class="h-[430px]"
          />
        </div>
      </div>

      <div
        id="ButtonsSection"
        class="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full"
      >
        <div
          id="UpdateInfoButtons"
          v-if="!uploadedImage"
          class="flex items-center justify-end"
        >
          <BaseButton color="white" @click="() => setIsEditProfileOpen(false)">
            Cancel
          </BaseButton>

          <BaseButton
            :disabled="!isUpdated"
            :class="!isUpdated ? 'bg-gray-200' : 'bg-[#f02c56]'"
            class="ml-3"
            color="red"
            @click="() => updateUserInfo()"
          >
            Apply
          </BaseButton>
        </div>

        <div id="CropperButtons" v-else class="flex items-center justify-end">
          <BaseButton color="white" @click="() => (uploadedImage = null)">
            Cancel
          </BaseButton>

          <BaseButton
            class="ml-3"
            color="red"
            @click="() => cropAndUpdateImage()"
          >
            Apply
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

