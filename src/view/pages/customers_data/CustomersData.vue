<template>
  <div class="card card-custom gutter-b">
    <div class="card-header py-6">
      <h3 class="card-title font-weight-bolder">Customer Data</h3>
      <h4 v-if="!newCus"><b-badge pill variant="dark">id: {{form.id}}</b-badge></h4>
      <h4 v-if="newCus"><b-badge pill>new customer</b-badge></h4>
    </div>
    <!-- alert area -->
    <div class="mx-3">
      <b-alert
        :show="dismissCountDownFailed"
        dismissible
        variant="danger"
        @dismissed="dismissCountDownFailed=0"
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
        @dismissed="dismissCountDownSuccess=0"
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

      <b-form-group
        id="input-group-eml"
        label="Email:"
        label-for="input-eml"
      >
        <b-form-input
          id="input-eml"
          v-model="form.email"
          required
          type="email"
          placeholder="123@gmail.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-phe"
        label="Phone:"
        label-for="input-phe"
      >
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

      <b-button type="submit" variant="primary" class="mr-3">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { em_customers } from '@/core/services/firebaseInit';

export default {
  name: "cus_data",
  data() {
    return {
      dismissSecs: 5,
      dismissCountDownFailed: 0,
      dismissCountDownSuccess: 0,
      form: {
        id: '',
        head: '',
        name: '',
        company: '',
        phone: '',
        email: '',
        progress: '',
        state: '',
        selectedGender: ''
      },
      newCus: false,
      show: true,
      genderOptions: [
        { text: '女士', value: 'female' },
        { text: '男士', value: 'male' }
      ]
    }
  },
  mounted() {
    if (this.form.name == '') {
      alert("Customer data not found! Redirecting you to privous page...");
      this.$router.back();
    }
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "../dashboard" },
      { title: "Customer data" }
    ]);
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.new_customer) {
      next(vm => {
        vm.newCus = true
        vm.form.name = "New Customer"
      });
    } else {
      em_customers.doc(to.params.customer_id).get().then( function (doc) {
      next(vm => {
        vm.form.id = doc.id
        vm.form.head = doc.data().head
        vm.form.name = doc.data().name
        vm.form.company = doc.data().company
        vm.form.phone = doc.data().phone
        vm.form.email = doc.data().email
        vm.form.progress = doc.data().progress
        vm.form.state = doc.data().state
        vm.form.selectedGender = doc.data().gender
      })
    });
    }
  },
  computed: {
    ...mapGetters([
      "currentUser"
    ]),
  },
  methods: {
    countDownChangedFailed(dismissCountDown) {
      this.dismissCountDownFailed = dismissCountDown
    },
    countDownChangedSuccess(dismissCountDown) {
      this.dismissCountDownSuccess = dismissCountDown
    },
    showAlertFailed() {
      this.dismissCountDownFailed = this.dismissSecs
    },
    showAlertSuccess() {
      this.dismissCountDownSuccess = this.dismissSecs
    },
    onSubmit(evt) {
      evt.preventDefault()
      var cusData = {
        company: this.form.company,
        email: this.form.email,
        head: this.form.head,
        name: this.form.name,
        phone: this.form.phone,
        progress: this.form.progress,
        state: this.form.state,
        gender: this.form.selectedGender
      }
      var instance = this
      em_customers.doc(this.form.id).update(cusData).then(function() {
        instance.showAlertSuccess()
      }).catch(function(err) {
        instance.showAlertFailed()
        console.log(err);
      })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.id = ''
      this.form.name = ''
      this.form.company = ''
      this.form.phone = ''
      this.form.email = ''
      this.form.progress = ''
      this.form.state = ''
      this.form.selectedGender = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
