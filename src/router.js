import Vue from "vue";
import Router from "vue-router";
import Remote from "@/pages/Remote.vue";
import Diapo from "@/pages/Diapo.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "diapo",
      component: Diapo
    },
    {
      path: "/remote",
      name: "remote",
      component: Remote
    }
  ]
});

export default router;
