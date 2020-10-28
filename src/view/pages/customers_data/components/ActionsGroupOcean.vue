<template>
  <div>
    <button
      v-b-tooltip.hover
      :title="$t('CUSTOMER.PUSH', { msg: '拉入' })"
      @click="subscribeCus(item.id)"
      class="btn btn-icon btn-light btn-hover-primary btn-sm"
    >
      <span class="svg-icon svg-icon-md svg-icon-primary">
        <!--begin::Svg Icon -->
        <inline-svg src="media/svg/icons/General/Save.svg" />
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
    subscribeCus(id) {
      if (confirm(this.$t("STATE.SUBS"))) {
        var instance = this;
        em_customers(this.currentUser.fs_key)
          .doc(id)
          .update({
            uid: this.currentUser.id,
            handler: this.currentUser.display_name
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
          type: "subscribe",
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
