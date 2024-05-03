import { createRouter, createWebHashHistory } from "vue-router";
import ProjectsView from "../views/ProjectsView.vue";

const routes = [
  {
    path: "/",
    name: "projects",
    component: ProjectsView,
  },
  {
    path: "/add-project",
    name: "addProject",
    component: () => import("../views/AddProjectView.vue"),
  },
  {
    path: "/project/:editId",
    name: "editProject",
    component: () => import("../views/AddProjectView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
