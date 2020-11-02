<template>
  <div class="topbar-item">
    <div
      id="kt_quick_user_toggle"
      class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
    >
      <span
        class="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1"
      >
        {{ $t("GREETING.HI", { msg: "Hi," }) }}
      </span>
      <span
        class="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4"
      >
        {{ currentUser.user_login }}
      </span>
      <span class="symbol symbol-35">
        <span
          class="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30"
        >
          {{
            currentUser.user_login
              ? currentUser.user_login.charAt(0).toUpperCase()
              : "X"
          }}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          {{ $t("GREETING.USER_PROFILE", { msg: "User Profile" }) }}
          <small class="text-muted font-size-sm ml-2"></small>
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label" :src="userHeadUri" alt="" />
          </div>
          <div class="d-flex flex-column">
            <router-link
              to="/profile"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{ currentUser.display_name }}
            </router-link>
            <div class="text-muted mt-1">{{ currentUser.role_name }}</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-text text-muted text-hover-primary">
                    {{ currentUser.user_email }}
                  </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              {{ $t("GREETING.SIGN_OUT", { msg: "Sign Out" }) }}
            </button>
          </div>
        </div>
        <!--end::Header-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
  },
  computed: {
    ...mapGetters(["currentUser", "userHeadUri"]),
  },
};
</script>
