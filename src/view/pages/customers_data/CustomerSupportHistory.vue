<template>
  <div>
    <CentreLoader v-if="isLoading"></CentreLoader>
    <div class="card card-custom gutter-b col-xxl-12">
      <div class="card-header py-6">
        <h3 class="card-title">{{ cusCom }}<br />{{ cusName }}</h3>
        <h4>
          <b-badge pill variant="dark">{{
            $t("CUSTOMER.CUS_ID", { id: cusId })
          }}</b-badge>
        </h4>
      </div>
      <div class="card-body">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-tabs content-class="mt-3">
            <b-tab :title="$t('CUSTOMER.MESSAGE', { msg: 'msg' })" active>
              <b-form-group
                id="input-group-father"
                :label="$t('CUSTOMER.HISTORY_ADV.ROOT')"
                label-for="input-father"
                description='Always select "Default" when you are confusing.'
              >
                <b-form-select
                  v-model="form.root"
                  :options="options"
                ></b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                :label="$t('CUSTOMER.ADD_MSG', { msg: 'msg' })"
                label-for="input-1"
              >
                <b-form-textarea
                  id="input-1"
                  v-model="form.message"
                  rows="4"
                  max-rows="7"
                  :placeholder="
                    $t('CUSTOMER.ENTER_MSG', { msg: 'New message' })
                  "
                ></b-form-textarea>
              </b-form-group>
            </b-tab>
            <b-tab :title="$t('CUSTOMER.ADVANCED_OPT', { msg: 'Advanced' })">
              <b-form-group
                id="input-group-type"
                :label="$t('CUSTOMER.HISTORY_ADV.TYPE')"
                label-for="input-type"
              >
                <b-form-input
                  id="input-type"
                  v-model="form.type"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-tab>
          </b-tabs>

          <b-button
            :disabled="isLoading"
            type="submit"
            variant="primary"
            class="mr-3"
            >{{ $t("CUSTOMER.SUBMIT", { msg: "Submit" }) }}</b-button
          >
          <b-button type="reset" variant="danger">
            {{ $t("CUSTOMER.RESET", { msg: "Reset" }) }}
          </b-button>
        </b-form>
      </div>
    </div>

    <div>
      <b-form-group label="Display filters:" class="mt-6">
        <b-form-checkbox-group
          v-model="selected"
          :options="filterOptions"
          name="buttons-1"
          @change="toggleLogCat($event)"
        ></b-form-checkbox-group>
      </b-form-group>
      <v-app id="my_vue_app">
        <v-main>
          <v-card>
            <v-card-title>
              Log Table
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
              :items="filteredLogs"
              :sort-by="['time']"
              :sort-desc="true"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-main>
      </v-app>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapGetters } from "vuex";
import { em_histories, timestamp } from "@/core/services/firebaseInit";
import CentreLoader from "@/view/content/widgets/CentreLoader";
import { delay } from "@/core/services/delayLoading";
import { getToastConfig } from "@/core/services/toastStyleService";

export default {
  name: "CustomerSupportHistory",
  computed: {
    ...mapGetters(["currentUser"])
  },
  data() {
    return {
      isLoading: false,
      selected: ["2"],
      filterOptions: [
        { text: "System", value: "1" },
        { text: "用户定义", value: "2" }
      ],
      cusId: "",
      cusName: "",
      cusCom: "",
      form: {
        message: "",
        isRoot: false,
        root: "user-defined",
        type: ""
      },
      options: [],
      show: true,
      search: "",
      headers: [
        {
          text: "操作者",
          align: "left",
          sortable: false,
          value: "from"
        },
        { text: "父类型", value: "root", align: " d-none" },
        { text: "类型", value: "type" },
        { text: "留言", value: "message" },
        { text: "时间戳", value: "time" }
      ],
      logs: [],
      filteredLogs: [],
      isAdmin: false
    };
  },
  components: {
    CentreLoader
  },
  created() {
    this.cusId = this.$route.params.customer_id;
    this.cusName = this.$route.params.customer_name;
    this.cusCom = this.$route.params.customer_company;
    this.isAdmin = this.$route.params.is_admin;
    var instance = this;
    em_histories(this.currentUser.fs_key)
      .where("customerId", "==", this.cusId)
      .onSnapshot(function(querySnapshot) {
        var logs = [];
        var roots = [
          {
            value: "user-defined",
            text: "Default"
          }
        ];
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
            from: doc.data().from,
            message: doc.data().message,
            root: doc.data().root,
            type: doc.data().type,
            isRoot: doc.data().isRoot,
            time: datePrettyPrint(doc.data().time.toDate())
          });
        });

        //fetch options
        var f_root = [];
        var f_proot = [];
        var f_child = [];
        var f_disjoint = [];
        for (var i = 0; i < logs.length; i++) {
          var item = logs[i];
          var option = {
            root: item.root,
            message: item.message,
            type: item.type,
            isRoot: item.isRoot,
            child: []
          };
          if (option.root == "user-defined") {
            f_root.push(option);
          } else {
            f_child.push(option);
          }
          if (option.isRoot) {
            f_proot.push(option);
          }
        }

        for (var m = 0; m < f_child.length; m++) {
          var child = f_child[m];
          var success = false;
          for (var j = 0; j < f_proot.length; j++) {
            if (child.root == f_proot[j].type) {
              success = true;
              f_proot[j].child.push(child);
              break;
            }
          }
          if (!success) {
            f_disjoint.push(child);
          }
        }

        // recursive indent
        function ri(list, prefix) {
          var output = [];
          for (var k = 0; k < list.length; k++) {
            var opt = list[k];

            if (opt.isRoot) {
              output.push({
                value: opt.type,
                text: `${prefix} ${opt.type}: ${opt.message}`
              });
            } else {
              return output;
            }

            if (opt.child.length > 0) {
              var result = ri(opt.child, prefix + " - - - - ");
              for (var l = 0; l < result.length; l++) {
                output.push(result[l]);
              }
            }
          }
          return output;
        }

        instance.logs = logs;
        instance.filterLogs();
        instance.options = roots.concat(ri(f_root, "｜- "));
      });
  },
  methods: {
    toggleLogCat(e) {
      this.filterLogs(e);
    },
    filterLogs(e) {
      var displayUserDef = true;
      var displaySysDef = true;

      if (!e) {
        displaySysDef = false;
      } else if (e.length == 0) {
        displayUserDef = false;
        displaySysDef = false;
      } else if (e.length == 1) {
        if (e[0] == 1) {
          displayUserDef = false;
        } else {
          displaySysDef = false;
        }
      }

      this.filteredLogs = this.logs.filter(log => {
        return (
          (displaySysDef && log.root == "system") ||
          (displayUserDef && log.root != "system")
        );
      });
    },
    makeToast(title, message) {
      this.toastCount++;
      this.$bvToast.toast(message, getToastConfig(title, "warning"));
    },
    showAlertFailed() {
      this.$bvToast.toast(
        this.$t("STATE.FAIL"),
        getToastConfig(this.$t("STATE.TITLE"), "danger")
      );
    },
    showAlertSuccess() {
      this.$bvToast.toast(
        this.$t("STATE.SUCCESS"),
        getToastConfig(this.$t("STATE.TITLE"), "success")
      );
    },
    onSubmit(evt) {
      evt.preventDefault();

      this.isLoading = true;

      delay().then(() => {
        if (!this.cusId) {
          this.showAlertFailed();
          this.isLoading = false;
          return;
        }
        if (/^\s*$/.test(this.form.type)) {
          this.form.isRoot = false;
        } else {
          this.form.isRoot = true;
        }
        if (/^\s*$/.test(this.form.message) && !this.form.isRoot) {
          this.makeToast(
            this.$t("CUSTOMER.WARNINGS.EMPTY_MESSAGE_TITLE"),
            this.$t("CUSTOMER.WARNINGS.EMPTY_MESSAGE_BODY")
          );
          this.isLoading = false;
          return;
        }

        if (
          this.form.type.toLowerCase() == "system" ||
          this.form.root.toLowerCase() == "system" ||
          this.form.type.toLowerCase() == "user-defined" ||
          this.form.type.toLowerCase() == "Message"
        ) {
          this.makeToast(
            this.$t("CUSTOMER.WARNINGS.RESEVERED_KEYWORD_TITLE"),
            this.$t("CUSTOMER.WARNINGS.RESEVERED_KEYWORD_BODY")
          );
          this.isLoading = false;
          return;
        }
        var instance = this;

        em_histories(this.currentUser.fs_key)
          .add({
            customerId: this.cusId,
            from: this.currentUser.user_login,
            message: this.form.message,
            root: this.form.root,
            type: this.form.isRoot ? this.form.type : "Message",
            isRoot: this.form.isRoot,
            time: timestamp()
          })
          .then(function() {
            instance.showAlertSuccess();
            instance.onReset();
          })
          .catch(function() {
            instance.showAlertFailed();
          });
        this.isLoading = false;
      });
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      // Reset our form values
      this.form.message = "";
      this.form.isRoot = false;
      this.form.root = "user-defined";
      this.form.type = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  mounted() {
    if (this.isAdmin) {
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: this.$t("MENU.ADMIN"), route: "../admin" },
        { title: this.$t("MENU.DATA") }
      ]);
    } else {
      this.$store.dispatch(SET_BREADCRUMB, [
        {
          title: this.$t("MENU.DASHBOARD", { msg: "仪表板" }),
          route: "../dashboard"
        },
        { title: this.$t("CUSTOMER.SUPPORT_HISTORY", { msg: "History" }) }
      ]);
    }
  }
};
</script>

<style scope>
.v-application--wrap {
  min-height: 0px !important;
}
</style>
