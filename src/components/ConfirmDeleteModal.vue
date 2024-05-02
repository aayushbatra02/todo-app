<template>
  <div
    class="bg-black/40 absolute inset-0 cursor-pointer flex justify-center items-center"
    @click.self="$emit('showConfirmModalHandler', false)"
  >
    <div
      class="bg-white p-12 rounded flex flex-col items-center gap-4 relative cursor-default"
    >
      <div class="text-xl font-bold">CONFIRM DELETE</div>
      <button
        class="border-2 border-black w-max px-4 py-2 font-bold hover:bg-black hover:text-white rounded"
        @click="$emit('deleteHandler', id)"
      >
        CONFIRM
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