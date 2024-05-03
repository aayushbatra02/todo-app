<template>
  <div class="flex justify-center gap-6 py-10 lg:text-lg text-gray-500">
    <RouterLink activeClass="border-b-2 border-green-500" to="/"
      >Projects</RouterLink
    >
    <RouterLink
      v-if="!editId"
      activeClass="border-b-2 border-green-500"
      to="/add-project"
    >
      Add a new project</RouterLink
    >
    <RouterLink
      v-else
      activeClass="border-b-2 border-green-500"
      :to="`/project/${editId}`"
      >Update Project</RouterLink
    >
  </div>
</template>

<script>
export default {
  props: ["editId"],
};
</script>