<template>
  <div class="flex justify-center gap-6 py-10 lg:text-lg text-gray-500">
    <RouterLink activeClass="border-b-2 border-green-500" to="/"
      >Projects</RouterLink
    >
    <RouterLink activeClass="border-b-2 border-green-500" to="/add-project"
      ><span v-if="editId">Update Project</span
      ><span v-else>Add a New Project</span>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: ["editId"],
};
</script>