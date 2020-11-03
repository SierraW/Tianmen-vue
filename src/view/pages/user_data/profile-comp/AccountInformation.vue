<template>
  <!--begin::Card-->
  <div class="card card-custom">
    <!--begin::Header-->
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          Account Information
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1"
          >Change your account settings</span
        >
      </div>
      <div class="card-toolbar">
        <button
          type="reset"
          class="btn btn-success mr-2"
          @click="save()"
          ref="kt_save_changes"
        >
          Save Changes
        </button>
        <button type="reset" class="btn btn-secondary" @click="cancel()">
          Cancel
        </button>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Form-->
    <form class="form">
      <div class="card-body">
        <!--begin::Heading-->
        <div class="row">
          <label class="col-xl-3"></label>
          <div class="col-lg-9 col-xl-6">
            <h5 class="font-weight-bold mb-6">Account:</h5>
          </div>
        </div>
        <!--begin::Form Group-->
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label">Login</label>
          <div class="col-lg-9 col-xl-6">
            <div>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                ref="login"
                :value="currentUser.user_login"
                readonly
              />
            </div>
            <span class="form-text text-muted">This cannot be changed.</span>
          </div>
        </div>
        <!--begin::Form Group-->
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label">Title</label>
          <div class="col-lg-9 col-xl-6">
            <div>
              <input
                type="text"
                class="form-control form-control-lg form-control-solid"
                ref="title"
                :value="currentUser.title_name"
                readonly
              />
            </div>
          </div>
        </div>
        <!--begin::Form Group-->
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label">Role</label>
          <div class="col-lg-9 col-xl-6">
            <div>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                ref="role"
                :value="currentUser.role_name"
                readonly
              />
            </div>
          </div>
        </div>
        <!--begin::Form Group-->
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label">Company</label>
          <div class="col-lg-9 col-xl-6">
            <div>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                ref="company"
                :value="currentUser.company_name"
                readonly
              />
            </div>
          </div>
        </div>
        <!--begin::Form Group-->
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label"
            >Activation code</label
          >
          <div class="col-lg-9 col-xl-6">
            <div>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                v-model="act_code"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
    <!--end::Form-->
  </div>
  <!--end::Card-->
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "AccountInformation",
  data() {
    return {
      act_code: ""
    };
  },
  methods: {
    save() {
      // set spinner to submit button
      const submitButton = this.$refs["kt_save_changes"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        Swal.fire({
          title: "Warning",
          text:
            "This page is under development, nothing will change at the moment",
          icon: "error"
        });

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    },
    cancel() {
      this.$refs.login.value = this.currentUser.user_login;
      this.$refs.title.value = this.currentUser.title_name;
      this.$refs.role.value = this.currentUser.role_name;
      this.$refs.company.value = this.currentUser.company_name;
      this.act_code = "";
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style scoped></style>
