<template>
  <div>
    <div class="row">
      <div class="col-xxl-12 mb-6">
        <div class="card card-custom">
          <div class="card-header">
            <h2 class="card-title font-weight-bolder">Version 1.2.2</h2>
          </div>
          <div class="card-body">
            <p>Finestudio Client Resource Management System</p>
            <br />
            <p>
              New Profile nav<br />
              fix: Source and category did not appear correctly in histories<br />
              fix: Progress did not appear correctly in histories<br />
              AS alignment fix<br />
            </p>
          </div>
        </div>
      </div>

      <div class="col-xxl-12">
        <div class="card card-custom">
          <div class="card-header">
            <h2 class="card-title font-weight-bolder">Version 1.2.1</h2>
          </div>
          <div class="card-body">
            <p>Finestudio Client Resource Management System</p>
            <br />
            <p>
              new user profile page<br />
              new daily statistic table<br />
              new leader board table<br />
              new reset password page<br />
              new account info change page<br />
              support custom head pic<br />
              ocean notification<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "ver-info",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("MENU.VER") }]);
  }
};
</script>
