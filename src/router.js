import Vue from "vue";
import Router from "vue-router";
import Home from "./components/FlatbondForm.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "form",
      component: () => import("./components/FlatbondForm.vue")
    },
    {
      path: "/confirm",
      name: "confirmation",
      component: () => import("./components/FlatbondConfirmation.vue")
    }
  ]
});
