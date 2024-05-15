import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/employee",
    name: "employee.index",
    component: () => import("../views/employee/index.vue"),
  },
  {
    path: "/create",
    name: "employee.create",
    component: () => import("../views/employee/create.vue"),
  },
  {
    path: "/edit/:id",
    name: "employee.edit",
    component: () => import("../views/employee/edit.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
