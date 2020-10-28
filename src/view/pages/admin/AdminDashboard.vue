<template>
  <div>
    <div class="row">
      <div class="col-xxl-12">
        <CustomerListTable
          :isOcean="false"
          :isAdmin="isAdmin"
        ></CustomerListTable>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import CustomerListTable from "@/view/content/widgets/advance-table/CustomerListTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "admin_dashboard",
  components: {
    CustomerListTable
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isAdmin() {
      return this.currentUser.role_id < 4;
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: this.$t("MENU.DASHBOARD"),
        route: "dashboard"
      },
      { title: this.$t("MENU.ADMIN") }
    ]);
  }
};
</script>
