<template>
  <div class="d-flex flex-row">
    <div
      class="flex-row-auto offcanvas-mobile w-300px w-xl-350px"
      id="kt_profile_aside"
    >
      <div class="card card-custom card-stretch">
        <div class="card-body pt-8">
          <div class="d-flex align-items-center">
            <div
              class="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center"
            >
              <div
                class="symbol-label"
                :style="{
                  backgroundImage: `url(${userHeadUri})`
                }"
              ></div>
            </div>
            <div>
              <a
                class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
                >{{ currentUser.display_name }}</a
              >
              <div class="text-muted">{{ currentUser.title_name }}</div>
            </div>
          </div>
          <!--end::User-->
          <!--begin::Contact-->
          <div class="py-9">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Email:</span>
              <a class="text-muted text-hover-primary">{{
                currentUser.user_email
              }}</a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Login Name:</span>
              <span class="text-muted">{{ currentUser.user_login }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="font-weight-bold mr-2">Company Name:</span>
              <span class="text-muted">{{ currentUser.company_name }}</span>
            </div>
          </div>
          <!--end::Contact-->
          <!--begin::Nav-->
          <div
            class="navi navi-bold navi-hover navi-active navi-link-rounded"
            role="tablist"
          >
            <div class="navi-item mb-2">
              <a
                class="navi-link py-4 active"
                @click="setActiveTab"
                href="#"
                data-tab="0"
                data-toggle="tab"
                role="tab"
                aria-selected="false"
              >
                <span class="navi-icon mr-2">
                  <span class="svg-icon">
                    <inline-svg src="media/svg/icons/Design/Layers.svg" />
                  </span>
                </span>
                <span class="navi-text font-size-lg">Profile Overview</span>
              </a>
            </div>
            <div class="navi-item mb-2">
              <a
                class="navi-link py-4"
                @click="setActiveTab"
                href="#"
                data-tab="1"
                data-toggle="tab"
                role="tab"
                aria-selected="false"
              >
                <span class="navi-icon mr-2">
                  <span class="svg-icon">
                    <inline-svg src="media/svg/icons/General/User.svg" />
                  </span>
                </span>
                <span class="navi-text font-size-lg">Personal Information</span>
              </a>
            </div>
            <div class="navi-item mb-2">
              <a
                class="navi-link py-4"
                @click="setActiveTab"
                href="#"
                data-tab="2"
                data-toggle="tab"
                role="tab"
                aria-selected="false"
              >
                <span class="navi-icon mr-2">
                  <span class="svg-icon">
                    <inline-svg src="media/svg/icons/Code/Compiling.svg" />
                  </span>
                </span>
                <span class="navi-text font-size-lg">Account Information</span>
              </a>
            </div>
            <div class="navi-item mb-2">
              <a
                class="navi-link py-4"
                @click="setActiveTab"
                href="#"
                data-tab="3"
                data-toggle="tab"
                role="tab"
                aria-selected="false"
              >
                <span class="navi-icon mr-2">
                  <span class="svg-icon">
                    <inline-svg
                      src="media/svg/icons/Communication/Shield-user.svg"
                    />
                  </span>
                </span>
                <span class="navi-text font-size-lg">Change Passwort</span>
                <span class="navi-label">
                  <span
                    class="label label-light-danger label-rounded font-weight-bold"
                    >1</span
                  >
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--begin::Content-->
    <div class="flex-row-fluid ml-lg-8">
      <b-tabs class="hide-tabs" v-model="tabIndex">
        <b-tab active>
          <KTProfileOverview></KTProfileOverview>
        </b-tab>

        <b-tab>
          <KTPersonalInformation></KTPersonalInformation>
        </b-tab>

        <b-tab>
          <KTAccountInformation></KTAccountInformation>
        </b-tab>

        <b-tab>
          <KTChangePassword></KTChangePassword>
        </b-tab>
      </b-tabs>
    </div>
    <!--end::Content-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapGetters } from "vuex";
import KTProfileOverview from "@/view/pages/user_data/profile-comp/ProfileOverview";
import KTPersonalInformation from "@/view/pages/user_data/profile-comp/PersonalInformation";
import KTAccountInformation from "@/view/pages/user_data/profile-comp/AccountInformation";
import KTChangePassword from "@/view/pages/user_data/profile-comp/ChangePassword";

export default {
  name: "user_profile",
  components: {
    KTProfileOverview,
    KTPersonalInformation,
    KTAccountInformation,
    KTChangePassword
  },
  data() {
    return {
      tabIndex: 0
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Profile" }]);
  },
  methods: {
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      let target = event.target;
      if (!event.target.classList.contains("navi-link")) {
        target = event.target.closest(".navi-link");
      }

      const tab = target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".navi-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(target.getAttribute("data-tab"));

      // set current active tab
      target.classList.add("active");
    }
  },
  computed: {
    ...mapGetters(["currentUser", "userHeadUri"])
  }
};
</script>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>
