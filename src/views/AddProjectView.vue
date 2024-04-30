<template>
  <div class="flex flex-col bg-white w-[60%] m-auto p-4">
    <label class="text-gray-400 my-4" for="title">TITLE</label>
    <input
      @input="validateTitle"
      v-model="title"
      class="focus:border-none p-2 border-b-2 border-gray-200"
      type="text"
    />
    <div v-if="titleErrorMessage" class="text-red-500 my-2">
      {{ titleErrorMessage }}
    </div>
    <label class="text-gray-400 my-4" for="details">DETAILS</label>
    <textarea
      @input="validateDetails"
      v-model="details"
      class="focus:border-none p-2 border-2 border-gray-20"
      type="text"
    ></textarea>
    <div v-if="detailsErrorMessage" class="text-red-500 my-2">
      {{ detailsErrorMessage }}
    </div>
    <button
      @click="addProjectHandler"
      class="my-4 bg-green-600 w-max m-auto text-white px-3 py-2 rounded-lg"
    >
      Add Project
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      details: null,
      titleErrorMessage: null,
      detailsErrorMessage: null,
      doValidation: false,
    };
  },
  methods: {
    validateTitle() {
      this.titleErrorMessage =
        !this.title && this.doValidation ? "Title is required" : null;
    },
    validateDetails() {
      this.detailsErrorMessage =
        !this.details && this.doValidation ? "Details are required" : null;
    },
    addProjectHandler() {
      this.doValidation = true;
      this.validateTitle();
      this.validateDetails();
      if (this.title && this.details) {
        let projects = JSON.parse(localStorage.getItem("projects"));
        if (!projects) {
          projects = [];
          localStorage.setItem("projects", JSON.stringify(projects));
        }
        projects.push({
          id: new Date().getTime(),
          title: this.title,
          details: this.details,
          isCompleted: false,
        });
        localStorage.setItem("projects", JSON.stringify(projects));
        this.title = "";
        this.details = "";
      }
    },
  },
};
</script>