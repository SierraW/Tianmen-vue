<template>
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <h1 class="card-title">{{ $t("CATEGORY.PAGE") }}</h1>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-10">
          <b-form-input v-model="categroyName"></b-form-input>
        </div>
        <div class="col">
          <b-button @click="addCategory" variant="success">{{
            $t("CATEGORY.ADD")
          }}</b-button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <b-button v-b-toggle.collapse-cdm variant="primary">{{
            $t("SOURCE.COLL")
          }}</b-button>
          <b-collapse id="collapse-cdm" class="mt-2">
            <!-- <b-card> -->
            <b-table
              :items="categroyItems"
              :busy.sync="isBusy"
              :fields="fields"
              class="mt-3"
              outlined
            >
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                </div>
              </template>
            </b-table>
            <!-- </b-card> -->
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { em_categories, timestamp } from "@/core/services/firebaseInit";
import { getToastConfig } from "@/core/services/toastStyleService";

export default {
  name: "category_manager",
  data() {
    return {
      categroyName: "",
      isBusy: false,
      filter: "40",
      categroyItems: [],
      fields: [
        { key: "name", sortable: true },
        { key: "modifyBy", sortable: true },
        { key: "time", sortable: true },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.isBusy = true;
    var instance = this;
    function datePrettyPrint(dt) {
      return `${dt.getFullYear().toString().padStart(4, "0")}/${(
        dt.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${dt
        .getDate()
        .toString()
        .padStart(2, "0")} ${dt
        .getHours()
        .toString()
        .padStart(2, "0")}:${dt
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${dt.getSeconds().toString().padStart(2, "0")}`;
    }
    em_categories(this.currentUser.fs_key).onSnapshot(function (querySnapshot) {
      var resultItems = [];
      querySnapshot.forEach(function (doc) {
        resultItems.push({
          name: doc.data().name,
          modifyBy: doc.data().login,
          time: datePrettyPrint(doc.data().time.toDate()),
        });
      });
      if (resultItems.length > 0) {
        instance.categroyItems = resultItems;
      } else {
        instance.categroyItems = [
          {
            name: "",
            modifyBy: "Empty...",
            time: "",
          },
        ];
      }
      instance.isBusy = false;
    });
  },
  methods: {
    makeToast(title, message, variant = "warning") {
      this.$bvToast.toast(message, getToastConfig(title, variant));
    },
    async addCategory() {
      if (/^\s*$/.test(this.categroyName)) {
        this.makeToast(
          this.$t("CATEGORY.EMPTY_TITLE"),
          this.$t("CATEGORY.EMPTY_BODY")
        );
        return;
      }

      var result = await em_categories(this.currentUser.fs_key)
        .where("name", "==", this.categroyName)
        .get();

      if (!result.empty) {
        this.makeToast(
          this.$t("CATEGORY.EXIST_SOURCE_TITLE"),
          this.$t("CATEGORY.EXIST_SOURCE_BODY")
        );
        return;
      }

      em_categories(this.currentUser.fs_key)
        .add({
          name: this.categroyName,
          login: this.currentUser.user_login,
          time: timestamp(),
        })
        .then(() => {
          this.makeToast(
            this.$t("STATE.TITLE"),
            this.$t("STATE.SUCCESS"),
            "success"
          );
        })
        .catch(() => {
          this.makeToast(
            this.$t("STATE.TITLE"),
            this.$t("STATE.FAIL"),
            "danger"
          );
        });
    },
  },
};
</script>
