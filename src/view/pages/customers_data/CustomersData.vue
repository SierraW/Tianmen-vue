<template>
  <div class="card card-custom gutter-b col-xxl-12">
    <div class="card-header py-6">
      <h3 class="card-title">{{ form.company }}<br />{{ form.name }}</h3>
      <h4 v-if="!newCus">
        <b-badge pill variant="dark">{{
          $t("CUSTOMER.CUS_ID", { id: form.id })
        }}</b-badge>
      </h4>
      <h4 v-if="newCus">
        <b-badge pill>{{ $t("CUSTOMER.NEW_CUS_ID") }}</b-badge>
      </h4>
    </div>

    <div class="card-body">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <CDFormSource
          :value="form.source"
          @input="
            newSource => {
              form.source = newSource;
            }
          "
        ></CDFormSource>

        <b-form-group
          id="input-group-cpy"
          :label="$t('CUSTOMER.DATA.COM')"
          label-for="input-cpy"
        >
          <b-form-input
            id="input-cpy"
            v-if="!form.oCompany"
            v-model="form.company"
            required
            placeholder="ARAIN Company"
          ></b-form-input>
          <b-form-checkbox
            id="input-opt-cpy"
            name="input-opt-cpy"
            value="true"
            unchecked-value="false"
            @change="optionsChk(1, $event)"
          >
            {{ $t("CUSTOMER.DATA.EMPTY") }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          id="input-group-nme"
          :label="$t('CUSTOMER.DATA.NAME')"
          label-for="input-nme"
        >
          <b-form-input
            id="input-nme"
            v-if="!form.oName"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
          <b-form-checkbox
            name="input-opt-nme"
            value="true"
            unchecked-value="false"
            @change="optionsChk(2, $event)"
          >
            {{ $t("CUSTOMER.DATA.EMPTY") }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          id="input-group-eml"
          :label="$t('CUSTOMER.DATA.EMAIL')"
          label-for="input-eml"
        >
          <b-form-input
            id="input-eml"
            v-if="!form.oEmail"
            v-model="form.email"
            required
            type="email"
            placeholder="123@gmail.com"
          ></b-form-input>
          <b-form-checkbox
            name="input-opt-eml"
            value="true"
            unchecked-value="false"
            @change="optionsChk(3, $event)"
          >
            {{ $t("CUSTOMER.DATA.EMPTY") }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          id="input-group-phe"
          :label="$t('CUSTOMER.DATA.PHONE')"
          label-for="input-phe"
        >
          <b-form-input
            id="input-phe"
            v-if="!form.oPhone"
            v-model="form.phone"
            required
            placeholder="+11231231234"
          ></b-form-input>
          <b-form-checkbox
            name="input-opt-phe"
            value="true"
            unchecked-value="false"
            @change="optionsChk(4, $event)"
          >
            {{ $t("CUSTOMER.DATA.EMPTY") }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          id="input-group-wec"
          :label="$t('CUSTOMER.DATA.WECHAT')"
          label-for="input-wec"
        >
          <b-form-input id="input-wec" v-model="form.wechat"></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-gen"
          :label="$t('CUSTOMER.DATA.GENDER.NAME')"
          label-for="input-gen"
        >
          <b-form-radio-group
            id="input-gen"
            v-model="form.selectedGender"
            required
            buttons
            button-variant="outline-primary"
            name="radio-gender"
          >
            <b-form-radio value="female">
              {{ $t("CUSTOMER.DATA.GENDER.FEMALE") }}
            </b-form-radio>
            <b-form-radio value="male">
              {{ $t("CUSTOMER.DATA.GENDER.MALE") }}
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group
          id="input-group-pro"
          :label="$t('CUSTOMER.PROG')"
          label-for="input-pro"
        >
          <b-form-select
            v-show="form.state == 'primary'"
            id="input-pro"
            v-model="form.progress"
            class="mb-3"
          >
            <optgroup :label="$t('CUSTOMER.DATA.PROGRESS.IN_PROGRESS_GROUP')">
              <option value="0%">
                {{ $t("CUSTOMER.DATA.PROGRESS.NOT_CON") }}
              </option>
              <option value="10%">
                {{ $t("CUSTOMER.DATA.PROGRESS.CONTACTING") }}
              </option>
              <option value="20%">
                {{ $t("CUSTOMER.DATA.PROGRESS.FIRST_CON") }}
              </option>
              <option value="30%">
                {{ $t("CUSTOMER.DATA.PROGRESS.PLANNING") }}
              </option>
              <option value="50%">
                {{ $t("CUSTOMER.DATA.PROGRESS.REQ_GATHERING") }}
              </option>
              <option value="60%">
                {{ $t("CUSTOMER.DATA.PROGRESS.PLANNING_SECOND") }}
              </option>
              <option value="80%">
                {{ $t("CUSTOMER.DATA.PROGRESS.PRICE_NEGOTIATING") }}
              </option>
              <option value="100%">
                {{ $t("CUSTOMER.DATA.PROGRESS.CONTRACT") }}
              </option>
            </optgroup>
          </b-form-select>
          <b-form-checkbox
            id="checkbox-ProgressState"
            v-model="form.state"
            name="checkbox-ProgressState"
            value="danger"
            unchecked-value="primary"
          >
            {{ $t("CUSTOMER.DATA.STATE") }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          id="input-group-des"
          :label="$t('CUSTOMER.DATA.DESCRIPTION')"
          label-for="input-des"
        >
          <b-form-textarea
            id="textarea-rows"
            v-model="form.description"
            rows="8"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-3">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import {
  em_histories,
  em_customers,
  firebase
} from "@/core/services/firebaseInit";
import CDFormSource from "./components/CDFormSource";

export default {
  name: "cus_data",
  components: {
    CDFormSource
  },
  data() {
    return {
      toastCount: 0,
      old: "",
      form: {
        id: "",
        head: "media/svg/avatars/001-boy.svg",
        name: "",
        oName: false,
        company: "",
        oCompany: false,
        phone: "",
        oPhone: false,
        email: "",
        oEmail: false,
        source: {
          source: "",
          category: ""
        },
        progress: "0%",
        state: "primary",
        selectedGender: "",
        description: "",
        wechat: ""
      },
      newCus: false,
      show: true
    };
  },
  mounted() {
    if (this.newCus) {
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: this.$t("MENU.DASHBOARD"), route: "../dashboard" },
        { title: this.$t("CUSTOMER.OCEAN"), route: "../ocean" },
        { title: this.$t("MENU.DATA") }
      ]);
    } else {
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: this.$t("MENU.DASHBOARD"), route: "../dashboard" },
        { title: this.$t("MENU.DATA") }
      ]);
    }
  },
  created() {
    if (this.$route.params.new_customer) {
      this.newCus = true;
    } else if (this.$route.params.customer_id == "new_customer") {
      alert(this.$t("STATE.UNEXPECTED_REFRESH"));
      this.$router.push({ name: "cus_ocean" });
    } else {
      var instance = this;
      em_customers(this.currentUser.fs_key)
        .doc(this.$route.params.customer_id)
        .get()
        .then(function(doc) {
          instance.form.id = doc.id;
          instance.form.head = doc.data().head;
          instance.form.name = doc.data().name;
          instance.form.company = doc.data().company;
          instance.form.phone = doc.data().phone;
          instance.form.email = doc.data().email;
          instance.form.progress = doc.data().progress;
          instance.form.state = doc.data().state;
          instance.form.selectedGender = doc.data().gender;
          instance.form.description = doc.data().description;
          instance.form.source.source = doc.data().source;
          instance.form.source.category = doc.data().category;
          instance.form.wechat = doc.data().wechat;

          // instance.old = {
          //   id: doc.id,
          //   head: doc.data().head,
          //   name: doc.data().name,
          //   company: doc.data().company,
          //   phone: doc.data().phone,
          //   email: doc.data().email,
          //   progress: doc.data().progress,
          //   state: doc.data().state,
          //   selectedGender: doc.data().gender,
          //   description: doc.data().description,
          //   source: doc.data().source,
          //   category: doc.data().category,
          //   wechat: doc.data().wechat
          // };

          instance.old = instance.form;
        });
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    optionsChk(item, e) {
      const condi = e == "true";
      switch (item) {
        case 1:
          this.form.oCompany = condi;
          break;
        case 2:
          this.form.oName = condi;
          break;
        case 3:
          this.form.oEmail = condi;
          break;
        case 4:
          this.form.oPhone = condi;
      }
    },
    makeToast(title, message) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 5000,
        variant: "warning",
        toaster: "b-toaster-top-center",
        appendToast: true
      });
    },
    showAlertFailed() {
      this.$bvToast.toast(this.$t("STATE.FAIL"), {
        title: this.$t("STATE.TITLE"),
        variant: "danger",
        solid: true,
        toaster: "b-toaster-top-center",
        append: true
      });
    },
    showAlertSuccess() {
      this.$bvToast.toast(this.$t("STATE.SUCCESS"), {
        title: this.$t("STATE.TITLE"),
        variant: "success",
        solid: true,
        toaster: "b-toaster-top-center",
        append: true
      });
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (!this.currentUser.fs_key) {
        this.showAlertFailed();
        return;
      }
      const pattern = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d| 2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
      if (
        this.form.phone != "N/A" &&
        !pattern.test(this.form.phone) &&
        !this.form.oPhone
      ) {
        this.makeToast(
          this.$t("CUSTOMER.WARNINGS.PHONE_INVALID_TITLE"),
          this.$t("CUSTOMER.WARNINGS.PHONE_INVALID_BODY", {
            number: this.form.phone
          })
        );
        return;
      }
      var instance = this;
      var cusData = {
        company: this.form.oCompany ? "N/A" : this.form.company,
        email: this.form.oEmail ? "N/A@n.a" : this.form.email,
        head: this.form.head,
        name: this.form.oName ? "N/A" : this.form.name,
        phone: this.form.oPhone ? "N/A" : this.form.phone,
        progress: this.form.progress,
        state: this.form.progress == "100%" ? "success" : this.form.state,
        gender: this.form.selectedGender,
        description: this.form.description ? this.form.description : "",
        source: this.form.source.source,
        category: this.form.source.category,
        wechat: this.form.wechat
      };
      if (this.newCus) {
        const result = await em_customers(this.currentUser.fs_key)
          .where("phone", "==", this.form.phone)
          .get();
        if (result.size > 0) {
          if (
            !confirm(
              this.$t("CUSTOMER.DATA.PHONE_ALREADY_EXIST", {
                number: this.form.phone
              })
            )
          ) {
            return;
          }
        }
        cusData.inviter_uid = this.currentUser.id;
        cusData.uid = "";
        cusData.handler = "Ocean";
        cusData.time = firebase.firestore.Timestamp.fromDate(new Date());
        em_customers(this.currentUser.fs_key)
          .add(cusData)
          .then(function() {
            instance.showAlertSuccess();
          })
          .catch(function() {
            instance.showAlertFailed();
          });
        em_histories(this.currentUser.fs_key).add({
          customerId: this.form.id,
          message: JSON.stringify(cusData),
          type: "create",
          root: "system",
          isRoot: false,
          from: this.currentUser.user_login,
          time: firebase.firestore.Timestamp.fromDate(new Date())
        });
      } else {
        if (cusData.state == "danger") {
          cusData.uid = "";
          em_histories(this.currentUser.fs_key).add({
            customerId: this.form.id,
            message: "",
            type: "unsubscribe",
            root: "system",
            isRoot: false,
            from: this.currentUser.user_login,
            time: firebase.firestore.Timestamp.fromDate(new Date())
          });
        }
        em_customers(this.currentUser.fs_key)
          .doc(this.form.id)
          .update(cusData)
          .then(function() {
            instance.showAlertSuccess();
          })
          .catch(function() {
            instance.showAlertFailed();
          });
        const diff = this.different(cusData);
        if (diff.length > 0) {
          em_histories(this.currentUser.fs_key).add({
            customerId: this.form.id,
            message: JSON.stringify(diff),
            type: "modify",
            root: "system",
            isRoot: false,
            from: this.currentUser.user_login,
            time: firebase.firestore.Timestamp.fromDate(new Date())
          });
        }
      }
    },
    different(a) {
      var diff = [];
      for (const [key, value] of Object.entries(a)) {
        if (this.old[key] && this.old[key] !== value) {
          diff.push(`${key}: ${value}`);
        }
      }
      this.old = a;
      return diff;
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.id = "";
      this.form.name = "";
      this.form.oName = false;
      this.form.head = "media/svg/avatars/001-boy.svg";
      this.form.company = "";
      this.form.oCompany = false;
      this.form.phone = "";
      this.form.oPhone = false;
      this.form.email = "";
      this.form.oEmail = false;
      this.form.progress = "0%";
      this.form.state = "primary";
      this.form.source.source = "";
      this.form.source.category = "";
      this.form.selectedGender = "";
      this.form.description = "";
      this.form.wechat = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
