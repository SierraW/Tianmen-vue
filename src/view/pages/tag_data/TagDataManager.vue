<template>
  <div class="row">
    <div class="col-xl-6">
      <SourceDataManager></SourceDataManager>
    </div>
    <div class="col-xl-6">
      <h1>Here</h1>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import SourceDataManager from "@/view/pages/tag_data/SourceDataManager";

export default {
  name: "TagDataManager",
  components: {
    SourceDataManager
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("MENU.DASHBOARD"), route: "../dashboard" },
      { title: this.$t("MENU.DATA") }
    ]);
  }
};
</script>
