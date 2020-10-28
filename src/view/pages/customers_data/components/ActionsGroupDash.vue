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
          fs_key: currentUser.fs_key,
          is_admin: isAdmin
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
          new_customer: false,
          is_admin: isAdmin
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
      v-if="isAdmin"
      v-b-tooltip.hover
      :title="$t('CUSTOMER.DEL')"
      v-on:click="deleteCus(item.id)"
      class="btn btn-icon btn-light btn-hover-danger btn-sm mr-3"
    >
      <span class="svg-icon svg-icon-md svg-icon-danger">
        <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->
        <inline-svg src="media/svg/icons/General/Trash.svg" />
        <!--end::Svg Icon-->
      </span>
    </button>
    <button
      v-b-tooltip.hover
      :title="$t('CUSTOMER.POP', { msg: 'Unsubscribe' })"
      v-on:click="unsubscribeCus(item.id)"
      class="btn btn-icon btn-light btn-hover-primary btn-sm"
    >
      <span class="svg-icon svg-icon-md svg-icon-primary">
        <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->
        <inline-svg src="media/svg/icons/Code/Error-circle.svg" />
        <!--end::Svg Icon-->
      </span>
    </button>
  </div>
</template>

<script>
import {
  em_customers,
  em_histories,
  timestamp
} from "@/core/services/firebaseInit";
import { mapGetters } from "vuex";
import { getToastConfig } from "@/core/services/toastStyleService";

export default {
  name: "ActionsGroupOcean",
  props: {
    item: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  computed: mapGetters(["currentUser"]),
  data() {
    return {};
  },
  methods: {
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, getToastConfig(title, variant));
    },
    deleteCus(id) {
      if (confirm(this.$t("STATE.DEL"))) {
        var instance = this;
        em_customers(this.currentUser.fs_key)
          .doc(id)
          .delete()
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
          message: JSON.stringify(this.item),
          type: "delete",
          root: "system",
          isRoot: false,
          from: this.currentUser.user_login,
          time: timestamp()
        });
      }
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
          message: JSON.stringify({
            snapshot: true,
            name: this.item.name,
            company: this.item.company,
            email: this.item.email,
            phone: this.item.phone,
            wechat: this.item.wechat
          }),
          type: "unsubscribe",
          root: "system",
          isRoot: false,
          from: this.currentUser.user_login,
          time: timestamp()
        });
      }
    }
  }
};
</script>
