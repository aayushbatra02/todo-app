<template>
  <div
    class="bg-black/50 fixed inset-0 cursor-pointer flex justify-center items-center"
    @click.stop.self="$emit('hideConfirmModalHandler')"
  >
    <div
      class="bg-white p-6 lg:p-12 m-8 rounded flex flex-col items-center gap-4 relative cursor-default"
    >
      <div class="text-lg lg:text-xl text-red-500 font-bold">{{ title }}</div>
      <div class="lg:text-lg text-center">
        {{ para }}
      </div>
      <div class="flex gap-8">
        <button
          class="border-2 border-red-500 text-red-500 w-max px-4 py-1 font-bold hover:bg-red-500 text-red-500 hover:text-white rounded"
          @click.stop="$emit('primaryButtonHandler')"
        >
          {{ primaryButtonText }}
        </button>
        <button
          class="border-2 border-gray-500 text-gray-500 w-max px-4 py-1 font-bold hover:bg-gray-500 text-gray-500 hover:text-white rounded"
          @click.stop="$emit('hideConfirmModalHandler')"
        >
          {{ secondaryButtonText }}
        </button>
      </div>
      <button
        class="absolute top-2 right-2"
        @click.stop="$emit('hideConfirmModalHandler')"
      >
        <Icon
          class="w-8 h-8 cursor-pointer text-gray-500"
          icon="basil:cross-outline"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: { Icon },
  emits: ["hideConfirmModalHandler", "primaryButtonHandler"],
  props: ["title", "para", "primaryButtonText", "secondaryButtonText"],
};
</script>