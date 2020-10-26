<template>
  <div>
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
        <inline-svg src="media/svg/icons/Communication/Write.svg" />
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
        <inline-svg src="media/svg/icons/General/Settings-1.svg" />
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
  name: "ActionsGroupOcean",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: mapGetters(["currentUser"]),
  data() {
    return {};
  },
  methods: {
    makeToast(title, message, variant, delay = 5000) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: delay,
        variant: variant,
        toaster: "b-toaster-top-center",
        appendToast: true
      });
    },
    unsubscribeCus(id) {
      if (confirm(this.$t("STATE.UNSUBS"))) {
        var instance = this;
        em_customers(this.currentUser.fs_key)
          .doc(id)
          .update({
            uid: "",
            handler: "Ocean"
          })
          .then(function() {
            instance.makeToast(
              instance.$t("STATE.TITLE"),
              instance.$t("STATE.SUCCESS"),
              "success"
            );
          })
          .catch(function() {
            instance.makeToast(
              instance.$t("STATE.TITLE"),
              instance.$t("STATE.FAIL"),
              "danger"
            );
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
    }
  }
};
</script>
