<template>
  <div>
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title font-weight-bolder text-dark">Activity Overview</h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2">
      <template v-for="(item, i) in list">
        <!--begin::Item-->
        <div
          class="d-flex flex-wrap align-items-center"
          v-bind:key="i"
          v-bind:class="{ 'mb-9': lastElement(i) }"
        >
          <!--begin::Symbol-->
          <div class="symbol symbol-60 symbol-2by3 flex-shrink-0 mr-4">
            <div class="symbol-label d-flex flex-column">
              <h1 class="mb-0">{{ item.text4 }}</h1>
              <p class="text-muted font-weight-bold font-size-sm my-1">times</p>
            </div>
          </div>
          <!--end::Symbol-->
          <!--begin::Title-->
          <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
            <a
              class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"
              >{{ item.text1 }}</a
            >
            <span class="text-muted font-weight-bold font-size-sm my-1">{{
              item.text2
            }}</span>
            <span class="text-muted font-weight-bold font-size-sm"
              >Created by:
              <span class="text-primary font-weight-bold">{{
                item.text3
              }}</span></span
            >
          </div>
          <!--end::Title-->
          <!--begin::Info-->
          <div class="d-flex align-items-center py-lg-0 py-2">
            <div class="d-flex flex-column text-right">
              <span
                v-bind:class="comparedTextColor(item)"
                class="font-weight-bolder font-size-h2"
                >{{ item.previousCom.value }}</span
              >
              <span class="text-muted font-size-sm font-weight-bolder"
                >Compared to last priod</span
              >
            </div>
          </div>
          <!--end::Info-->
        </div>
        <!--end::Item-->
      </template>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TEStatisticEngine from "@/core/services/TEStatisticEngine";

export default {
  name: "widget-2",
  data() {
    return {
      list: [
        {
          text1: "Message set",
          text2: "(Today)",
          text3: "TEStatisticEngine",
          text4: "0",
          previousCom: {
            value: 0,
            class: ""
          }
        },
        {
          text1: "New customer created",
          text2: "(This month)",
          text3: "TEStatisticEngine",
          text4: "0",
          previousCom: {
            value: 0,
            class: ""
          }
        },
        {
          text1: "Progress changed",
          text2: "(This month)",
          text3: "TEStatisticEngine",
          text4: "0",
          previousCom: {
            value: 0,
            class: ""
          }
        },
        {
          text1: "Project created",
          text2: "(This month)",
          text3: "TEStatisticEngine",
          text4: "0",
          previousCom: {
            value: 0,
            class: ""
          }
        }
      ]
    };
  },
  async created() {
    const statisticEngine = new TEStatisticEngine(
      this.currentUser.fs_key,
      this.currentUser.user_login
    );
    this.list[0].text4 = await statisticEngine.getDailyMessagesReport();
    this.list[1].text4 = await statisticEngine.getMonthlyNewCustomerReport();
    this.list[2].text4 = await statisticEngine.getMonthlyProgressReport();
    this.list[3].text4 = await statisticEngine.getMonthProjectReport();
    this.list[0].previousCom = await statisticEngine.getComparisonDMR();
    this.list[1].previousCom = await statisticEngine.getComparisonMNCR();
    this.list[2].previousCom = await statisticEngine.getComparisonMPR();
  },
  methods: {
    lastElement(i) {
      if (i === this.list.length - 1) {
        return false;
      } else {
        return true;
      }
    },
    comparedTextColor(item) {
      return {
        "text-danger": item.previousCom.class == "text-danger",
        "text-success": item.previousCom.class == "text-success"
      };
    }
  },
  computed: {
    ...mapGetters(["currentUser", "layoutConfig"])
  }
};
</script>
