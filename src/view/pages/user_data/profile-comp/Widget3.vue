<template>
  <div class="card card-custom card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark"
          >Leader Board</span
        >
        <span class="text-muted mt-3 font-weight-bold font-size-sm"
          >Data provided by TEStatisticEngine</span
        >
      </h3>
      <div class="card-toolbar">
        <ul class="nav nav-pills nav-pills-sm nav-dark-75">
          <li class="nav-item">
            <a
              class="nav-link py-2 px-4"
              data-toggle="tab"
              :class="{ active: this.show === 'today' }"
              href="#kt_tab_pane_2_1"
              @click="show = 'today'"
              >Today</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link py-2 px-4"
              data-toggle="tab"
              :class="{ active: this.show === 'month' }"
              href="#kt_tab_pane_2_2"
              @click="show = 'month'"
              >Previous month</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link py-2 px-4"
              data-toggle="tab"
              :class="{ active: this.show === 'alltime' }"
              href="#kt_tab_pane_2_3"
              @click="show = 'alltime'"
              >All Time</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2 pb-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr>
              <th class="p-0" style="width: 50px"></th>
              <th class="p-0" style="min-width: 150px"></th>
              <th class="p-0" style="min-width: 140px"></th>
              <th class="p-0" style="min-width: 120px"></th>
              <th class="p-0" style="min-width: 40px"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in dataToShow">
              <tr v-bind:key="i">
                <td class="pl-0 py-5">
                  <div class="symbol symbol-50 symbol-light mr-2">
                    <span
                      class="symbol-label"
                      v-bind:class="rankBadgeColorClass(i, item.user_login)"
                    >
                      <h1 class="h-50 align-self-center">
                        {{ i + 1 }}
                      </h1>
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <a
                    class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >{{ item.display_name }}</a
                  >
                  <span class="text-muted font-weight-bold d-block">{{
                    item.user_login
                  }}</span>
                </td>
                <td class="text-right">
                  <b-form-input
                    v-if="showInput(item.user_login)"
                    @change="setSpeech($event, i)"
                    class="text-muted font-weight-bold"
                    size="sm"
                    placeholder="Acceptance speech"
                    :value="item.acceptanceSpeech"
                  ></b-form-input>
                  <span
                    v-if="!showInput(item.user_login)"
                    class="text-muted font-weight-bold"
                    >{{ item.acceptanceSpeech }}</span
                  >
                </td>
                <td class="text-right">
                  <span>{{ item.subtitle }}</span>
                </td>
                <td class="text-right pr-0">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40 symbol-2by3 flex-shrink-0 mr-4">
                    <div class="symbol-label d-flex flex-column">
                      <h4 class="mb-0">{{ item.value }}</h4>
                      <p class="text-muted font-weight-bold font-size-sm my-1">
                        times
                      </p>
                    </div>
                  </div>
                  <!--end::Symbol-->
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TEStatisticEngine from "@/core/services/TEStatisticEngine";

export default {
  name: "widget-12",
  data() {
    return {
      show: "today",
      today: [],
      month: [],
      alltime: []
    };
  },
  async created() {
    var statisticEngine = new TEStatisticEngine(
      this.currentUser.fs_key,
      this.currentUser.user_login
    );
    this.today = await statisticEngine.getMessageTopChartFrom("d");
    this.alltime = await statisticEngine.getMessageTopChartFrom("a");
    statisticEngine.getPMReport().then(data => (this.month = data));
  },
  computed: {
    ...mapGetters(["currentUser", "layoutConfig"]),
    dataToShow() {
      if (this.show === "alltime") return this.alltime;
      if (this.show === "today") return this.today;
      if (this.show === "month") return this.month;
      return this.alltime;
    }
  },
  methods: {
    setSpeech(speech, index) {
      var statisticEngine = new TEStatisticEngine(
        this.currentUser.fs_key,
        this.currentUser.user_login
      );
      statisticEngine.setSpeechOnPMR(index, speech);
    },
    showInput(login) {
      return this.currentUser.user_login === login && this.show === "month";
    },
    rankBadgeColorClass(index, login) {
      if (login === "-") {
        return;
      }
      return {
        champion: index === 0,
        secondPlace: index === 1,
        thirdPlace: index === 2
      };
    }
  }
};
</script>

<style scoped>
.champion {
  background-color: #f9ff60 !important;
  background-image: linear-gradient(315deg, #bf953f 0%, #fbf5b7 74%) !important;
  color: silver !important;
}
.secondPlace {
  background-color: #b8c6db !important;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%) !important;
  color: gold !important;
}
.thirdPlace {
  background-color: #fec84e !important;
  background-image: linear-gradient(315deg, #fec84e 0%, #ffdea8 74%) !important;
  color: snow !important;
}
</style>
