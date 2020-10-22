<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          {{ $t("CUSTOMER.STATES", { msg: "Customer States" }) }}
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          {{ $t("CUSTOMER.MANAGEMENT", { msg: "Management Panel" }) }}
        </span>
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table
          class="table table-head-custom table-vertical-center"
          id="kt_advance_table_widget_1"
        >
          <thead>
            <tr class="text-left">
              <th class="pl-0" style="width: 20px">
                <label class="checkbox checkbox-lg checkbox-single">
                  <input
                    type="checkbox"
                    @input="setCheck($event.target.checked)"
                  />
                  <span></span>
                </label>
              </th>
              <th class="pr-0" style="min-width: 250px">
                {{ $t("CUSTOMER.COM", { msg: "COMPANY" }) }}
              </th>
              <th style="min-width: 150px">
                {{ $t("CUSTOMER.CON", { msg: "CONTACT" }) }}
              </th>
              <th style="min-width: 150px">
                {{ $t("CUSTOMER.PROG", { msg: "PROGRESS" }) }}
              </th>
              <th class="pr-0 text-right" style="min-width: 150px">
                {{ $t("CUSTOMER.ACTI", { msg: "ACTION" }) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in list">
              <tr v-bind:key="i">
                <td class="pl-0">
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" value="1" :checked="checked" />
                    <span></span>
                  </label>
                </td>
                <td class="pl-3">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >{{ item.company }}</a
                  >
                  <span
                    class="text-muted font-weight-bold text-muted d-block"
                    >{{ item.email }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ item.name }}</span
                  >
                  <span class="text-muted font-weight-bold">{{
                    item.phone
                  }}</span>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 mr-2">
                    <div
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <span
                        class="text-muted mr-2 font-size-sm font-weight-bold"
                        >{{ item.progress }}</span
                      >
                      <span class="text-muted font-size-sm font-weight-bold">
                        {{ getProgressString(item.progress) }}
                      </span>
                    </div>
                    <div class="progress progress-xs w-100">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="{ width: item.progress }"
                        v-bind:class="`bg-${item.state}`"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="pr-0 text-right">
                  <router-link
                    v-b-tooltip.hover
                    :title="$t('CUSTOMER.TRACK', { msg: 'History' })"
                    v-bind:to="{
                      name: 'cus_his',
                      params: {
                        customer_id: item.id,
                        customer_name: item.name,
                        customer_company: item.company,
                        fs_key: currentUser.fs_key
                      }
                    }"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg-->
                      <inline-svg
                        src="media/svg/icons/Communication/Write.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </router-link>
                  <router-link
                    v-b-tooltip.hover
                    :title="$t('CUSTOMER.EDIT', { msg: 'Edit' })"
                    v-bind:to="{
                      name: 'cus_data',
                      params: {
                        customer_id: item.id,
                        new_customer: false
                      }
                    }"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <!--begin::Svg Icon | path:assets/media/svg/icons/General/Settings-1.svg-->
                      <inline-svg
                        src="media/svg/icons/General/Settings-1.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </router-link>
                  <button
                    v-b-tooltip.hover
                    :title="$t('CUSTOMER.POP', { msg: 'Unsubscribe' })"
                    v-on:click="unsubscribeCus(item.id)"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->
                      <inline-svg src="media/svg/icons/General/Trash.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
    <!--end::Advance Table Widget 2-->
  </div>
</template>

<script>
import {
  em_customers,
  em_histories,
  firebase
} from "@/core/services/firebaseInit";
import { mapGetters } from "vuex";

export default {
  name: "widget-2",
  data() {
    return {
      list: [],
      checked: false
    };
  },
  created() {
    em_customers(this.currentUser.fs_key)
      .where("uid", "==", this.currentUser.id)
      .onSnapshot(querySnapshot => {
        var emCusRecords = [];
        querySnapshot.forEach(function(doc) {
          const cusRecord = {
            id: doc.id,
            head: "media/svg/avatars/001-boy.svg",
            company: doc.data().company,
            email: doc.data().email,
            name: doc.data().name,
            phone: doc.data().phone,
            progress: doc.data().progress,
            state: doc.data().state,
            time: doc.data().time,
            inviter_uid: "abcd"
          };
          emCusRecords.push(cusRecord);
        });
        this.list = emCusRecords;
      });
  },
  components: {},
  computed: mapGetters(["currentUser"]),
  methods: {
    getProgressString(progress) {
      switch (progress) {
        case "0%":
          return this.$t("CUSTOMER.DATA.PROGRESS.NOT_CON");
        case "10%":
          return this.$t("CUSTOMER.DATA.PROGRESS.CONTACTING");
        case "20%":
          return this.$t("CUSTOMER.DATA.PROGRESS.FIRST_CON");
        case "30%":
          return this.$t("CUSTOMER.DATA.PROGRESS.PLANNING");
        case "50%":
          return this.$t("CUSTOMER.DATA.PROGRESS.REQ_GATHERING");
        case "60%":
          return this.$t("CUSTOMER.DATA.PROGRESS.PLANNING_SECOND");
        case "80%":
          return this.$t("CUSTOMER.DATA.PROGRESS.PRICE_NEGOTIATING");
        case "100%":
          return this.$t("CUSTOMER.DATA.PROGRESS.CONTRACT");
      }
    },
    setCheck(checked) {
      this.checked = checked;
    },
    unsubscribeCus(id) {
      if (
        confirm(
          this.$t('STATE.UNSUBS')
        )
      ) {
        em_customers(this.currentUser.fs_key)
          .doc(id)
          .update({
            uid: ""
          });
        em_histories(this.currentUser.fs_key).add({
          customerId: id,
          message: "",
          type: "unsubscribe",
          root: "system",
          isRoot: false,
          from: this.currentUser.user_login,
          time: firebase.firestore.Timestamp.fromDate(new Date())
        });
      }
    },
    getFSKey() {
      return this.currentUser.fs_key;
    }
  }
};
</script>
