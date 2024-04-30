import { createRouter, createWebHistory } from "vue-router";
import ProjectsView from "../views/ProjectsView.vue";

const routes = [
  {
    path: "/",
    name: "projects",
    component: ProjectsView,
  },
  {
    path: "/add-project",
    children: [
      {
        path: "",
        name: "addProject",
        component: () => import("../views/AddProjectView.vue"),
      },
      {
        path: ":editId",
        name: "editProject",
        component: () => import("../views/AddProjectView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
