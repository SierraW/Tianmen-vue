import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/ocean",
          name: "cus_ocean",
          component: () =>
            import("@/view/pages/customers_data/CustomersOcean.vue")
        },
        {
          path: "/customer/:customer_id",
          name: "cus_data",
          component: () =>
            import("@/view/pages/customers_data/CustomersData.vue")
        },
        {
          path: "/history/:customer_name",
          name: "cus_his",
          component: () =>
            import("@/view/pages/customers_data/CustomerSupportHistory.vue")
        },
        {
          path: "/activation_code",
          name: "activation",
          component: () =>
            import("@/view/pages/activation/ActivationCodeGen.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/login_pages/Login-1"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/login_pages/Login-1")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/login_pages/Login-1")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
