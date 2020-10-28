<template>
  <div>
    <div class="text-center" v-if="isLoading">
      <b-spinner variant="danger" label="Text Centered"></b-spinner>
    </div>

    <v-app id="my_vue_app" v-if="!isLoading">
      <v-main>
        <v-card>
          <v-card-title>
            {{ $t("ALL_HIS.TABLE") }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="logs"
            :sort-by="['time']"
            :sort-desc="true"
            :search="search"
            multi-sort
          ></v-data-table>
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { em_histories } from "@/core/services/firebaseInit";
import { mapGetters } from "vuex";

export default {
  name: "db-allhis",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("MENU.ALL_HIS") }]);
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isAdmin() {
      return this.currentUser.role_id < 4;
    }
  },
  data() {
    return {
      isLoading: true,
      headers: [
        {
          text: "time",
          align: "left",
          sortable: true,
          value: "time"
        },
        { text: "from", value: "from" },
        { text: "type", value: "type" },
        { text: "message", value: "message" },
        { text: "root", value: "root" },
        { text: "isroot", value: "isRoot" },
        { text: "isroot", value: "isRoot" },
        { text: "customerId", value: "customerId" },
        { text: "docId", value: "id" }
      ],
      logs: [],
      search: ""
    };
  },
  created() {
    this.isLoading = true;
    if (!this.isAdmin) {
      alert("Unauthories Access!");
      this.$router.push({ name: "dashboard" });
    }
    var instance = this;
    em_histories(this.currentUser.fs_key)
      .get()
      .then(function(querySnapshot) {
        var logs = [];
        function datePrettyPrint(dt) {
          return `${dt
            .getFullYear()
            .toString()
            .padStart(
              4,
              "0"
            )}/${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
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
        querySnapshot.forEach(function(doc) {
          logs.push({
            id: doc.id,
            customerId: doc.data().customerId,
            from: doc.data().from,
            message: doc.data().message,
            root: doc.data().root,
            type: doc.data().type,
            isRoot: doc.data().isRoot,
            time: datePrettyPrint(doc.data().time.toDate())
          });
        });
        instance.logs = logs;
        instance.isLoading = false;
      });
  }
};
</script>
