<template>
  <div>
    <div class="row card card-custom gutter-b">
      <div class="card-header py-6">
        <h3 class="card-title font-weight-bolder">Customer Data</h3>
        <h4><b-badge pill variant="dark">id: {{cusId}}</b-badge></h4>
      </div>
      <div class="col-md-12 card-body">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="加入留言:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </div>

    <div class="row card card-custom gutter-b">
      <div class="col-md-12 card-body">
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
              :items="logs"
              :search="search"
            ></v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapGetters } from "vuex";
import { em_histories } from '@/core/services/firebaseInit';

export default {
  name: "CustomerSupportHistory",
  computed: mapGetters(['currentUser']),
  data() {
    return {
      cusId: '',
      form: {
        email: ''
      },
      show: true,
      search: '',
      headers: [
        {
          text: '操作者',
          align: 'left',
          sortable: false,
          value: 'from',
        },
        { text: '父类型', value: 'root' },
        { text: '类型', value: 'type' },
        { text: '留言', value: 'message' },
        { text: '时间戳', value: 'time' },
      ],
      logs: []
    }
  },
  components: {
  },
  beforeRouteEnter(to, from, next) {
    em_histories.where("customer_id", "==", to.params.customer_id).onSnapshot(function(querySnapshot) {
      var logs = [];
      querySnapshot.forEach(function(doc) {
        logs.push({
          id: doc.id,
          from: doc.data().from,
          message: doc.data().message,
          root: doc.data().root,
          type: doc.data().type
        });
      });

      next(vm => {
        vm.logs = logs
        vm.cusId = to.params.customer_id
      });

    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "../dashboard" },
      { title: "SupportHistory" }
    ]);
  }
};
</script>
