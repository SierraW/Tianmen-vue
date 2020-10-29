<template>
  <div>
    <div class="card card-custom gutter-b col-xxl-12">
      <div class="card-header">
        <div class="card-title">
          <h1 class="mt-5">{{ $t("ACT.MOD_NAME") }}</h1>
        </div>
      </div>
      <div class="card-body">
        <b-tabs content-class="mt-3">
          <b-tab :title="$t('ACT.TAB')" active>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="input-group-num"
                :label="$t('ACT.NUM')"
                label-for="input-num"
              >
                <b-form-input
                  id="input-num"
                  v-model="form.num"
                  required
                  type="number"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-title"
                :label="$t('ACT.TITLE.NAME')"
                label-for="input-title"
              >
                <b-form-select
                  id="input-title"
                  v-model="form.title_id"
                  :options="titles"
                  class="mb-3"
                >
                </b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-role"
                :label="$t('ACT.ROLE.NAME')"
                label-for="input-role"
              >
                <b-form-select
                  id="input-role"
                  v-model="form.role_id"
                  class="mb-3"
                >
                  <option value="2">
                    {{ $t("ACT.ROLE.ADMIN") }}
                  </option>
                  <option value="3">
                    {{ $t("ACT.ROLE.DEV") }}
                  </option>
                  <option value="4">
                    {{ $t("ACT.ROLE.USR") }}
                  </option>
                </b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-com"
                :label="$t('ACT.COM.NAME')"
                label-for="input-com"
              >
                <b-form-select
                  id="input-com"
                  v-model="form.com_id"
                  :options="companies"
                  class="mb-3"
                >
                </b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-descr"
                :label="$t('ACT.DES')"
                label-for="input-descr"
              >
                <b-form-textarea
                  id="input-descr"
                  size="lg"
                  v-model="form.description"
                ></b-form-textarea>
              </b-form-group>

              <b-button type="submit" variant="primary" class="mr-3"
                >Submit</b-button
              >
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-tab>
          <b-tab :title="$t('ACT.ADD_COM.TAB')">
            <CompanyDataManager></CompanyDataManager>
          </b-tab>
          <b-tab :title="$t('ACT.CODE.TAB')">
            <v-app id="my_vue_app">
              <v-main>
                <v-card>
                  <v-card-title>
                    {{ $t("ACT.CODE.TABLE_NAME") }}
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
                    :page.sync="page"
                    items-per-page="10"
                    hide-default-footer
                    @page-count="pageCount = $event"
                    :headers="headers"
                    :items="codes"
                    :sort-by="['display_name']"
                    :sort-desc="true"
                    :search="search"
                  ></v-data-table>
                  <div class="text-center pt-2">
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                    ></v-pagination>
                    <br />
                  </div>
                </v-card>
              </v-main>
            </v-app>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class="card card-custom gutter-b col-xxl-12" v-if="hasItem">
      <div class="card-header">
        <div class="card-title">
          <h3>本次生成的激活码</h3>
        </div>
      </div>
      <div class="card-body">
        <h6>短说明: {{ description }}</h6>
        <p class="text-monospace mt-6" v-for="item in items" :key="item">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ApiService from "@/core/services/api.service";
import { em } from "@/core/services/firebaseInit";
import { getToastConfig } from "@/core/services/toastStyleService";
import CompanyDataManager from "@/view/pages/tag_data/CompanyDataManager";

export default {
  name: "activation",
  components: {
    CompanyDataManager
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("MENU.DASHBOARD"), route: "dashboard" },
      { title: this.$t("ACT.MOD_NAME") }
    ]);
  },
  created() {
    ApiService.post("getCodeState.php", {
      session: this.currentUser.user_session
    })
      .then(({ data }) => {
        this.codes = data.data;
      })
      .catch(({ message }) => {
        this.toast("Get code status Failed", message, "danger");
      });
    em.get()
      .then(query => {
        var results = [];
        query.forEach(doc => {
          results.push({
            value: doc.data().id,
            text: doc.data().name
          });
        });
        this.companies = results;
      })
      .catch(message => {
        this.toast("Get company status Failed", message, "danger");
      });
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: "Code",
          align: "left",
          sortable: false,
          value: "activation_code"
        },
        { text: "Title", value: "title_name" },
        { text: "Role", value: "role_name" },
        { text: "Company", value: "com_name" },
        { text: "User_login", value: "user_login" },
        { text: "User_display", value: "display_name" },
        { text: "Requester", value: "requester" }
      ],
      search: "",
      show: true,
      form: {
        num: "1",
        title_id: "5",
        role_id: "4",
        com_id: "1",
        description: ""
      },
      companies: [],
      codes: [],
      titles: [
        {
          value: 5,
          text: this.$t("ACT.TITLE.DEV")
        },
        {
          value: 6,
          text: this.$t("ACT.TITLE.PROM")
        },
        {
          value: 7,
          text: this.$t("ACT.TITLE.UID")
        },
        {
          value: 8,
          text: this.$t("ACT.TITLE.ACM")
        }
      ],
      items: [],
      description: ""
    };
  },
  methods: {
    toast(title, body, variant) {
      this.$bvToast.toast(body, getToastConfig(title, variant));
    },
    onSubmit(evt) {
      evt.preventDefault();
      var formData = {
        session: this.currentUser.user_session,
        num: this.form.num,
        title_id: this.form.title_id,
        role_id: this.form.role_id,
        com_id: this.form.num_id ? this.form.num_id : 1,
        des: this.form.description ? this.form.description : ""
      };
      ApiService.post("generateActCode.php", formData)
        .then(({ data }) => {
          this.items = data.data;
          if (this.items.length == 0) {
            throw new Error(data.message);
          }
          this.description = this.form.description;
        })
        .catch(({ message }) => {
          this.toast("Generate Failed", message, "danger");
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.num = "1";
      this.form.title_id = "5";
      this.form.role_id = "4";
      this.form.com_id = "1";
      this.form.description = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    hasItem() {
      return this.items.length > 0;
    }
  }
};
</script>
