<template>
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <div class="card-title">
        <h1> Act Gen </h1>
      </div>
      <div class="card-body">
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "activation",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "dashboard" },
      { title: "Activation Code Generator" }
    ]);
  }
};
</script>