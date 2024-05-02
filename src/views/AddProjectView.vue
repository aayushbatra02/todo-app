<template>
  <div class="flex flex-col bg-white mx-4 lg:mx-8 p-4 rounded-lg">
    <label class="text-gray-400 my-4" for="title">TITLE</label>
    <input
      @input="validateTitle"
      v-model.trim="title"
      class="focus:border-none p-2 border-b-2 border-gray-200"
      type="text"
    />
    <div v-if="titleErrorMessage" class="text-red-500 my-2">
      {{ titleErrorMessage }}
    </div>
    <label class="text-gray-400 my-4" for="details">DETAILS</label>
    <textarea
      @input="validateDetails"
      v-model.trim="details"
      class="focus:border-none p-2 border-2 border-gray-20 lg:min-w-80"
      type="text"
    ></textarea>
    <div v-if="detailsErrorMessage" class="text-red-500 my-2">
      {{ detailsErrorMessage }}
    </div>
    <button
      @click="addProjectHandler"
      class="my-4 bg-green-600 w-max m-auto text-white px-3 py-2 rounded-lg"
    >
      <span v-if="editId">Update Project</span>
      <span v-else>Add Project</span>
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
      editId: null,
    };
  },
  mounted() {
    this.editId = Number(this.$route.params.editId);
    const projects = JSON.parse(localStorage.getItem("projects"));
    const project = projects.find((project) => project.id === this.editId);
    if (project) {
      this.title = project.title;
      this.details = project.details;
    }
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
        if (this.editId) {
          const updatedProjects = projects.map((project) => {
            if (project.id === this.editId) {
              project.title = this.title;
              project.details = this.details;
            }
            return project;
          });
          projects = updatedProjects;
        } else {
          projects.push({
            id: new Date().getTime(),
            title: this.title,
            details: this.details,
            isCompleted: false,
          });
        }
        localStorage.setItem("projects", JSON.stringify(projects));
        this.$router.push({ name: "projects" });
      }
    },
  },
};
</script>