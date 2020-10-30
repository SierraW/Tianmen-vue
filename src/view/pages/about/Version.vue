<template>
  <div>
    <div class="row">
      <div class="col-xxl-12">
        <div class="card card-custom">
          <div class="card-header">
            <h2 class="card-title font-weight-bolder">
              Version 1.2.0.6
            </h2>
          </div>
          <div class="card-body">
            <p>Finestudio Client Resource Management System</p>
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
