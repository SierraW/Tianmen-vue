<template>
  <div>
    <div class="card card-custom gutter-b col-xxl-12">
      <div class="card-header">
        <div class="card-title">
          <h1 class="mt-5">{{ $t("ACT.MOD_NAME") }}</h1>
        </div>
      </div>
      <div class="card-body">
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
              class="mb-3"
            >
              <option value="3">
                {{ $t("ACT.TITLE.FS") }}
              </option>
              <option value="4">
                {{ $t("ACT.TITLE.CS") }}
              </option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-role"
            :label="$t('ACT.ROLE.NAME')"
            label-for="input-role"
          >
            <b-form-select id="input-role" v-model="form.role_id" class="mb-3">
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
              class="mb-3"
              disabled
            >
              <option value="1">
                {{ $t("ACT.COM.FS") }}
              </option>
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

export default {
  name: "activation",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("MENU.DASHBOARD"), route: "dashboard" },
      { title: this.$t("ACT.MOD_NAME") }
    ]);
  },
  data() {
    return {
      show: true,
      form: {
        num: "1",
        title_id: "3",
        role_id: "4",
        com_id: "1",
        description: ""
      },
      items: [],
      description: ""
    };
  },
  methods: {
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
          this.description = this.form.description;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.num = "1";
      this.form.title_id = "3";
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
