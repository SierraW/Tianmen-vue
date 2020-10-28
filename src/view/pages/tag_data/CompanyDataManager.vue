<template>
  <div>
    <div class="row">
      <div class="col-6">
        <b-form-input v-model="companyName"></b-form-input>
      </div>

      <div class="col">
        <b-button @click="addCompany" variant="success">{{
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
            :items="companyItems"
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
</template>

<script>
import { mapGetters } from "vuex";
import { em, timestamp } from "@/core/services/firebaseInit";
import { getToastConfig } from "@/core/services/toastStyleService";
import { datePrettyPrint } from "@/core/services/datePrintingService";
import ApiService from "@/core/services/api.service";

export default {
  name: "category_manager",
  data() {
    return {
      companyName: "",
      isBusy: false,
      filter: "40",
      companyItems: [],
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
    em.onSnapshot(function(querySnapshot) {
      var resultItems = [];
      querySnapshot.forEach(function(doc) {
        resultItems.push({
          id: doc.data().id,
          name: doc.data().name,
          modifyBy: doc.data().login,
          time: datePrettyPrint(doc.data().time.toDate())
        });
      });
      if (resultItems.length > 0) {
        instance.companyItems = resultItems;
      } else {
        instance.companyItems = [
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
    async addCompany() {
      this.isBusy = true;
      if (/^\s*$/.test(this.companyName)) {
        this.makeToast(
          this.$t("CATEGORY.EMPTY_TITLE"),
          this.$t("CATEGORY.EMPTY_BODY")
        );
        return;
      }

      var result = await em.where("name", "==", this.companyName).get();

      if (!result.empty) {
        this.makeToast(
          this.$t("CATEGORY.EXIST_SOURCE_TITLE"),
          this.$t("CATEGORY.EXIST_SOURCE_BODY")
        );
        return;
      }

      var success = true;
      var docId = "";
      var dbId = -1;

      await em
        .add({
          name: this.companyName,
          login: this.currentUser.user_login,
          time: timestamp()
        })
        .then(docRef => {
          docId = docRef.id;
        })
        .catch(() => {
          success = false;
        });

      if (!success) {
        this.makeToast(this.$t("STATE.TITLE"), this.$t("STATE.FAIL"), "danger");
        return;
      }

      await ApiService.post("addCompany.php", {
        session: this.currentUser.user_session,
        fs_key: docId,
        name: this.companyName
      })
        .then(({ data }) => {
          dbId = data.inserted_id;
        })
        .catch(() => {
          success = false;
        });

      if (!success) {
        this.makeToast(this.$t("STATE.TITLE"), this.$t("STATE.FAIL"), "danger");
        return;
      }

      await em
        .doc(docId)
        .update({
          id: dbId
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
      this.isBusy = false;
    }
  }
};
</script>
