import { defineStore } from 'pinia';

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref('');
    const name = ref('');
    const bio = ref('');
    const image = ref('');

    const getId = computed(() => id.value);
    const getName = computed(() => name.value);
    const getBio = computed(() => bio.value);
    const getImage = computed(() => image.value);

    return { getId, getName, getBio, getImage };
  },
  {
    persist: true,
  }
);

