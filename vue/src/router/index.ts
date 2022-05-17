import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FooView from "../views/FooView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/foo",
      name: "foo",
      component: FooView,
    },
  ],
});

export default router;
