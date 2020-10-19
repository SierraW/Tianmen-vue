<template>
  <div>
    <!--begin::Notice-->
    <div
      class="alert alert-custom alert-white alert-shadow gutter-b"
      role="alert"
    >
      <div class="alert-icon alert-icon-top">
        <span class="svg-icon svg-icon-3x svg-icon-primary mt-4">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Tools/Tools.svg" />
          <!--end::Svg Icon-->
        </span>
      </div>
      <div class="alert-text">
        <p>
          This
          <code>Ocean</code> is still under development.
        </p>
        <p>
          <span
            class="label label-inline label-pill label-info label-rounded mr-2"
          >
            INFO:
          </span>
        </p>
      </div>
    </div>
    <!--end::Notice-->
    <div class="row">
      <div class="col-xxl-12">
        <CustomerOceanWidgets></CustomerOceanWidgets>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import CustomerOceanWidgets from "@/view/content/widgets/advance-table/CustomerOceanWidgets.vue";

export default {
  name: "cus_ocean",
  components: {
    CustomerOceanWidgets
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: this.$t("MENU.DASHBOARD", { msg: "仪表板" }),
        route: "dashboard"
      },
      { title: this.$t("CUSTOMER.OCEAN", { msg: "公海" }) }
    ]);
  }
};
</script>
