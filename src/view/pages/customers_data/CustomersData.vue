<template>
  <div class="card card-custom gutter-b">
    <div class="card-header py-6">
      <h3 class="card-title">{{ form.company }}<br />{{ form.name }}</h3>
      <h4 v-if="!newCus">
        <b-badge pill variant="dark">id: {{ form.id }}</b-badge>
      </h4>
      <h4 v-if="newCus"><b-badge pill>new customer</b-badge></h4>
    </div>
    <!-- alert area -->
    <div class="mx-3">
      <b-alert
        :show="dismissCountDownFailed"
        dismissible
        variant="danger"
        @dismissed="dismissCountDownFailed = 0"
        @dismiss-count-down="countDownChangedFailed"
      >
        <p>Data upload failed... Please try again later.</p>
        <b-progress
          variant="dark"
          :max="dismissSecs"
          :value="dismissCountDownFailed"
          height="4px"
        ></b-progress>
      </b-alert>

      <b-alert
        :show="dismissCountDownSuccess"
        dismissible
        variant="success"
        @dismissed="dismissCountDownSuccess = 0"
        @dismiss-count-down="countDownChangedSuccess"
      >
        <p>Upload successful!</p>
        <b-progress
          variant="info"
          :max="dismissSecs"
          :value="dismissCountDownSuccess"
          height="4px"
        ></b-progress>
      </b-alert>
    </div>
    <!-- end of alert area -->
    <div class="card-body">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-cpy"
          label="Company Name:"
          label-for="input-cpy"
          description="Customer's company name"
        >
          <b-form-input
            id="input-cpy"
            v-model="form.company"
            required
            placeholder="ARAIN Company"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-nme" label="Name:" label-for="input-nme">
          <b-form-input
            id="input-nme"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-eml" label="Email:" label-for="input-eml">
          <b-form-input
            id="input-eml"
            v-model="form.email"
            required
            type="email"
            placeholder="123@gmail.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-phe" label="Phone:" label-for="input-phe">
          <b-form-input
            id="input-phe"
            v-model="form.phone"
            required
            placeholder="+1 123-123-1234"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-gen"
          label="Gender:"
          label-for="input-gen"
        >
          <b-form-radio-group
            id="input-gen"
            v-model="form.selectedGender"
            required
            buttons
            :options="genderOptions"
            button-variant="outline-primary"
            name="radio-gender"
          >
          </b-form-radio-group>
        </b-form-group>

        <b-form-group
          id="input-group-hea"
          label="Head (Optional):"
          label-for="input-hea"
        >
          <b-form-input
            id="input-hea"
            v-model="form.head"
            placeholder="media/svg/avatars/001-boy.svg"
          ></b-form-input>
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

export default {
  name: "cus_data",
  data() {
    return {
      dismissSecs: 5,
      dismissCountDownFailed: 0,
      dismissCountDownSuccess: 0,
      toastCount: 0,
      old: "",
      form: {
        id: "",
        head: "media/svg/avatars/001-boy.svg",
        name: "",
        company: "",
        phone: "",
        email: "",
        progress: "",
        state: "",
        selectedGender: ""
      },
      newCus: false,
      show: true,
      genderOptions: [
        { text: "女士", value: "female" },
        { text: "男士", value: "male" }
      ]
    };
  },
  mounted() {
    if (this.newCus) {
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: "Dashboard", route: "../dashboard" },
        { title: "Ocean", route: "../ocean" },
        { title: "Customer data" }
      ]);
    } else {
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: "Dashboard", route: "../dashboard" },
        { title: "Customer data" }
      ]);
    }
  },
  created() {
    if (this.$route.params.new_customer) {
      this.newCus = true;
      this.form.name = "New Customer";
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

          instance.old = {
            id: doc.id,
            head: doc.data().head,
            name: doc.data().name,
            company: doc.data().company,
            phone: doc.data().phone,
            email: doc.data().email,
            progress: doc.data().progress,
            state: doc.data().state,
            selectedGender: doc.data().gender
          };
        });
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    makeToast(title, message) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true
      });
    },
    countDownChangedFailed(dismissCountDown) {
      this.dismissCountDownFailed = dismissCountDown;
    },
    countDownChangedSuccess(dismissCountDown) {
      this.dismissCountDownSuccess = dismissCountDown;
    },
    showAlertFailed() {
      this.dismissCountDownFailed = this.dismissSecs;
    },
    showAlertSuccess() {
      this.dismissCountDownSuccess = this.dismissSecs;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (!this.currentUser.fs_key) {
        this.showAlertFailed();
        return;
      }
      const pattern = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d| 2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
      if (!pattern.test(this.form.phone)) {
        this.makeToast(
          "Data invalid",
          `Phone number invalid, your input is ${this.form.phone}. Valid phone number example: +16476543210`
        );
        return;
      }
      var instance = this;
      if (this.newCus) {
        const result = await em_customers(this.currentUser.fs_key)
          .where("phone", "==", this.form.phone)
          .get();
        if (result.size > 0) {
          this.makeToast(
            "Profile exist",
            `This phone number ${this.form.phone} already has a associated profile.`
          );
          return;
        }
        const newCusData = {
          company: this.form.company,
          email: this.form.email,
          head: this.form.head,
          inviter_uid: this.currentUser.id,
          name: this.form.name,
          phone: this.form.phone,
          progress: "100%",
          state: "primary",
          uid: "",
          time: firebase.firestore.Timestamp.fromDate(new Date()),
          gender: this.form.selectedGender
        };
        em_customers(this.currentUser.fs_key)
          .add(newCusData)
          .then(function() {
            instance.showAlertSuccess();
          })
          .catch(function() {
            instance.showAlertFailed();
          });
        em_histories(this.currentUser.fs_key).add({
          customerId: this.form.id,
          message: JSON.stringify(newCusData),
          type: "create",
          root: "system",
          isRoot: false,
          from: this.currentUser.user_login,
          time: firebase.firestore.Timestamp.fromDate(new Date())
        });
      } else {
        var cusData = {
          company: this.form.company,
          email: this.form.email,
          head: this.form.head,
          name: this.form.name,
          phone: this.form.phone,
          progress: this.form.progress,
          state: this.form.state,
          gender: this.form.selectedGender
        };
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
      this.form.head = "media/svg/avatars/001-boy.svg";
      this.form.company = "";
      this.form.phone = "";
      this.form.email = "";
      this.form.progress = "";
      this.form.state = "";
      this.form.selectedGender = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
