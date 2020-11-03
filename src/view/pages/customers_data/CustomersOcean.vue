<template>
  <div>
    <div class="row">
      <div class="col-xxl-12">
        <CustomerListTable :isOcean="true" :isAdmin="false"></CustomerListTable>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import CustomerListTable from "@/view/content/widgets/advance-table/CustomerListTable.vue";
import { VIEW_NEW_CUS } from "@/core/services/store/notification.module";
import { mapGetters } from "vuex";

export default {
  name: "cus_ocean",
  components: {
    CustomerListTable
  },
  computed: {
    ...mapGetters(["getLastestCreatedCustomerId"])
  },
  created() {
    this.$store.dispatch(VIEW_NEW_CUS, this.getLastestCreatedCustomerId);
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
