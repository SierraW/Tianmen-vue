<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xxl-12">
        <AdvancedTableWidget2></AdvancedTableWidget2>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-xxl-4">
        <ListWidget1></ListWidget1>
      </div>
      <div class="col-xxl-8">
        <AdvancedTableWidget2></AdvancedTableWidget2>
      </div>
    </div> -->

<!--     <div class="row">
      <div class="col-xxl-6 order-1 order-xxl-2">
        <ListWidget14></ListWidget14>
      </div>
      <div class="col-xxl-6 order-1 order-xxl-2">
        <ListWidget15></ListWidget15>
      </div>
    </div> -->
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import AdvancedTableWidget2 from "@/view/content/widgets/advance-table/Widget2.vue";

export default {
  name: "dashboard",
  components: {
    AdvancedTableWidget2,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    }
  }
};
</script>
