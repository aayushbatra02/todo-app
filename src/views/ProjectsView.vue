<template>
  <div class="w-[60%] m-auto">
    <div class="flex gap-4 text-gray-500 mb-5">
      <button
        :class="{ 'text-black': activeFilter === 'viewAll' }"
        @click="filterHandler('viewAll')"
      >
        VIEW ALL
      </button>
      <button
        :class="{ 'text-black': activeFilter === 'completed' }"
        @click="filterHandler('completed')"
      >
        COMPLETED
      </button>
      <button
        :class="{ 'text-black': activeFilter === 'ongoing' }"
        @click="filterHandler('ongoing')"
      >
        ONGOING
      </button>
    </div>
    <div v-if="filteredProjects.length === 0" class="text-xl font-bold">
      No Projects
    </div>
    <div class="flex flex-col gap-4" v-else>
      <div
        class="bg-white p-4 rounded border-l-4 cursor-pointer"
        :class="[project.isCompleted ? 'border-green-500' : 'border-pink-600']"
        v-for="project in filteredProjects"
        :key="project.id"
        @click="detailHandler(project.id)"
      >
        <div class="flex justify-between">
          <div class="font-semibold text-xl">{{ project.title }}</div>
          <div class="flex gap-3 items-center">
            <Icon
              @click.stop="deleteHandler(project.id)"
              class="w-6 h-6 cursor-pointer text-gray-400 hover:text-red-700"
              icon="ic:baseline-delete"
            />
            <Icon
              class="w-6 h-6 cursor-pointer text-gray-400 hover:text-blue-500"
              icon="ic:baseline-edit"
              @click.stop="editHandler(project.id)"
            />
            <Icon
              @click.stop="checkHandler(project.id)"
              class="w-6 h-6 cursor-pointer text-gray-400"
              icon="ic:baseline-check"
              :class="[project.isCompleted ? 'text-green-500' : '']"
            />
          </div>
        </div>
        <div v-if="isDescIdPresent(project.id)" class="text-gray-500 mt-2">
          {{ project.details }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: { Icon },
  data() {
    return {
      activeFilter: "viewAll",
      projects: [],
      filteredProjects: [],
      detailIds: [],
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

    // const testProjects = [
    //   {
    //     id: 1714473636515,
    //     title: "test1",
    //     details: "desc1",
    //     isCompleted: false,
    //   },
    //   {
    //     id: 1714473645180,
    //     title: "test2",
    //     details: "desc2",
    //     isCompleted: true,
    //   },
    //   {
    //     id: 1714473654024,
    //     title: "test3",
    //     details: "desc3",
    //     isCompleted: true,
    //   },
    //   {
    //     id: 1714473662646,
    //     title: "test4",
    //     details: "ustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic ty",
    //     isCompleted: true,
    //   },
    //   {
    //     id: 1714473672228,
    //     title: "test5",
    //     details: "desc5",
    //     isCompleted: false,
    //   },
    // ];
    // localStorage.setItem("projects", JSON.stringify(testProjects));
    // this.projects = testProjects;
  },
  methods: {
    filterHandler(filter) {
      switch (filter) {
        case "completed": {
          this.filteredProjects = this.projects.filter(
            (project) => project.isCompleted
          );
          break;
        }
        case "ongoing": {
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
    checkHandler(id) {
      const updatedProjects = this.projects.map((project) => {
        if (project.id === id) {
          project.isCompleted = !project.isCompleted;
        }
        return project;
      });
      this.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
    deleteHandler(id) {
      const updatedProjects = this.projects.filter(
        (project) => project.id !== id
      );
      this.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
    isDescIdPresent(id) {
      let isPresent = false;
      if (this.detailIds.find((descId) => descId === id)) {
        isPresent = true;
      }
      return isPresent;
    },
    detailHandler(id) {
      if (this.isDescIdPresent(id)) {
        const newIds = this.detailIds.filter((descId) => descId !== id);
        this.detailIds = newIds;
      } else {
        const newIds = [...this.detailIds, id];
        this.detailIds = newIds;
      }
    },
    editHandler(id) {
      this.$router.push({ name: "editProject", params: { editId: id } });
    },
  },
  watch: {
    projects() {
      this.filterHandler(this.activeFilter);
    },
    activeFilter() {
      this.detailIds = [];
    },
  },
};
</script>
