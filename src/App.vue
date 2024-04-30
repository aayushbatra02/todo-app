<template>
  <div class="bg-gray-200 pb-10 w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto my-20 rounded-lg">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
