<template>
  <div class="card card-custom gutter-b">
    <CentreLoader v-if="isLoading"></CentreLoader>
    <div class="card-header">
      <h1 class="card-title">{{ $t("SOURCE.PAGE") }}</h1>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-10">
          <b-form-input v-model="sourceName"></b-form-input>
        </div>
        <div class="col">
          <b-button
            :disabled="isLoading"
            @click="addSource"
            variant="success"
            >{{ $t("SOURCE.ADD") }}</b-button
          >
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <b-button v-b-toggle.collapse-sdm variant="primary">{{
            $t("SOURCE.COLL")
          }}</b-button>
          <b-collapse id="collapse-sdm" class="mt-2">
            <!-- <b-card> -->
            <b-table
              :items="sourceItems"
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
import { em_sources, timestamp } from "@/core/services/firebaseInit";
import { getToastConfig } from "@/core/services/toastStyleService";
import CentreLoader from "@/view/content/widgets/CentreLoader";
import { delay } from "@/core/services/delayLoading";

export default {
  name: "source_manager",
  components: {
    CentreLoader
  },
  data() {
    return {
      isLoading: false,
      sourceName: "",
      isBusy: false,
      filter: "40",
      sourceItems: [],
      fields: [
        { key: "name", sortable: true },
        { key: "modifyBy", sortable: true },
        { key: "time", sortable: true }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  created() {
    this.isBusy = true;
    var instance = this;
    function datePrettyPrint(dt) {
      return `${dt
        .getFullYear()
        .toString()
        .padStart(4, "0")}/${(dt.getMonth() + 1)
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
        .padStart(2, "0")}:${dt
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
    }
    em_sources(this.currentUser.fs_key).onSnapshot(function(querySnapshot) {
      var resultItems = [];
      querySnapshot.forEach(function(doc) {
        resultItems.push({
          name: doc.data().name,
          modifyBy: doc.data().login,
          time: datePrettyPrint(doc.data().time.toDate())
        });
      });
      if (resultItems.length > 0) {
        instance.sourceItems = resultItems;
      } else {
        instance.sourceItems = [
          {
            name: "",
            modifyBy: "Empty...",
            time: ""
          }
        ];
      }
      instance.isBusy = false;
    });
  },
  methods: {
    makeToast(title, message, variant = "warning") {
      this.$bvToast.toast(message, getToastConfig(title, variant));
    },
    addSource() {
      this.isLoading = true;

      delay().then(async () => {
        if (/^\s*$/.test(this.sourceName)) {
          this.makeToast(
            this.$t("SOURCE.EMPTY_TITLE"),
            this.$t("SOURCE.EMPTY_BODY")
          );
          this.isLoading = false;
          return;
        }

        var result = await em_sources(this.currentUser.fs_key)
          .where("name", "==", this.sourceName)
          .get();

        if (!result.empty) {
          this.makeToast(
            this.$t("SOURCE.EXIST_SOURCE_TITLE"),
            this.$t("SOURCE.EXIST_SOURCE_BODY")
          );
          this.isLoading = false;
          return;
        }

        await em_sources(this.currentUser.fs_key)
          .add({
            name: this.sourceName,
            login: this.currentUser.user_login,
            time: timestamp()
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

        this.isLoading = false;
      });
    }
  }
};
</script>
