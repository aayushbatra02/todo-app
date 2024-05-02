<template>
  <div
    class="bg-black/40 absolute inset-0 cursor-pointer flex justify-center items-center"
    @click.self="$emit('showConfirmModalHandler', false)"
  >
    <div
      class="bg-white p-6 lg:p-12 m-8 rounded flex flex-col items-center gap-4 relative cursor-default"
    >
      <div class="text-lg lg:text-xl font-bold">CONFIRM DELETE</div>
      <div class="lg:text-lg text-center">Are You Sure You Want To Delete ?</div>
      <button
        class="border-2 border-black w-max px-4 py-1 font-bold hover:bg-black hover:text-white rounded"
        @click="$emit('deleteHandler', id)"
      >
        YES
      </button>
      <button
        class="absolute top-2 right-2"
        @click="$emit('showConfirmModalHandler', false)"
      >
        <Icon
          class="w-8 h-8 cursor-pointer text-black"
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
  emits: ["showConfirmModalHandler", "deleteHandler"],
  props: ["id"],
};
</script>