<template>
  <div>
    <NavBar />
    <div class="px-8 text-sm md:text-normal">
      <div class="flex gap-4 text-gray-500 mb-5">
        <button
          v-for="(filter, id) in filters"
          :key="id"
          :class="{ 'text-black': activeFilter === filter }"
          @click="filterHandler(filter)"
        >
          {{ filter }}
        </button>
      </div>
      <div v-if="filteredProjects.length === 0" class="text-xl font-bold">
        No Projects
      </div>
      <div class="flex flex-col gap-4" v-else>
        <div
          class="bg-white p-4 rounded border-l-4 cursor-pointer"
          :class="[
            project.isCompleted ? 'border-green-500' : 'border-pink-600',
          ]"
          v-for="project in filteredProjects"
          :key="project.id"
          @click="detailHandler(project.id)"
        >
          <div class="flex justify-between gap-4">
            <div class="font-semibold text-base md:text-xl overflow-anywhere">
              {{ project.title }}
            </div>
            <div class="flex gap-3 items-center">
              <Icon
                @click.stop="showConfirmModalHandler(project.id)"
                class="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer text-gray-400 hover:text-red-700"
                icon="ic:baseline-delete"
              />
              <Icon
                class="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer text-gray-400 hover:text-blue-500"
                icon="ic:baseline-edit"
                @click.stop="editHandler(project.id)"
              />
              <Icon
                @click.stop="handleComplete(project.id)"
                class="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer text-gray-400"
                icon="ic:baseline-check"
                :class="[project.isCompleted ? 'text-green-500' : '']"
              />
            </div>
          </div>
          <div
            v-if="project.showDetails"
            class="text-gray-500 mt-2 overflow-anywhere"
          >
            {{ project.details }}
          </div>
        </div>
        <ConfirmationModal
          v-if="confirmModalId"
          @hideConfirmModalHandler="() => showConfirmModalHandler(false)"
          @primaryButtonHandler="() => deleteHandler(confirmModalId)"
          title="Confirm Delete"
          message="Are You Sure You Want To Delete ?"
          primaryButtonText="Confirm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { Icon } from "@iconify/vue";
import NavBar from "../components/NavBar.vue";

export default {
  components: { Icon, ConfirmationModal, NavBar },
  data() {
    return {
      activeFilter: "VIEW ALL",
      projects: [],
      filteredProjects: [],
      confirmModalId: false,
      filters: ["VIEW ALL", "COMPLETED", "ONGOING"],
    };
  },
  mounted() {
    let projectsInLocal = JSON.parse(localStorage.getItem("projects"));
    if (!projectsInLocal) {
      projectsInLocal = [];
      localStorage.setItem("projects", JSON.stringify(projectsInLocal));
    }
    this.projects = projectsInLocal;
    this.filteredProjects = projectsInLocal;
  },
  methods: {
    filterHandler(filter) {
      switch (filter) {
        case "COMPLETED": {
          this.filteredProjects = this.projects.filter(
            (project) => project.isCompleted
          );
          break;
        }
        case "ONGOING": {
          this.filteredProjects = this.projects.filter(
            (project) => !project.isCompleted
          );
          break;
        }
        default: {
          this.filteredProjects = this.projects;
          break;
        }
      }
      this.activeFilter = filter;
    },
    handleComplete(id) {
      const updatedProjects = this.projects.map((project) => {
        if (project.id === id) {
          project.isCompleted = !project.isCompleted;
        }
        return project;
      });
      this.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
    showConfirmModalHandler(id) {
      this.confirmModalId = id;
    },
    deleteHandler(id) {
      const updatedProjects = this.projects.filter(
        (project) => project.id !== id
      );
      this.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(this.projects));
      this.showConfirmModalHandler(false);
    },
    detailHandler(id) {
      const updatedProjects = this.projects.map((project) => {
        if (project.id === id) {
          if (project.showDetails) {
            project.showDetails = false;
          } else {
            project.showDetails = true;
          }
        }
        return project;
      });
      this.projects = updatedProjects;
    },
    editHandler(id) {
      this.$router.push({ path: `/project/${id}` });
    },
  },
  watch: {
    projects() {
      this.filterHandler(this.activeFilter);
    },
    activeFilter() {
      //close all descriptions
      const updatedProjects = this.projects.map((project) => {
        project.showDetails = false;
        return project;
      });
      this.projects = updatedProjects;
    },
  },
};
</script>

<style scoped>
.overflow-anywhere {
  overflow-wrap: anywhere !important;
}
</style>