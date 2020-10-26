<template>
  <div class="d-flex justify-content-around">
    <router-link
      v-bind:to="{
        name: 'cus_data',
        params: {
          customer_id: 'new_customer',
          new_customer: true,
          fs_key: this.fs_key
        }
      }"
      v-if="isOcean"
      v-b-tooltip.hover
      :title="$t('CUSTOMER.NEW')"
      class="btn btn-success"
    >
      <span class="svg-icon svg-icon-md svg-icon-white ml-3">
        <inline-svg src="media/svg/icons/Communication/Add-user.svg" /> </span
    ></router-link>
    <div class="input-group pl-5">
      <form method="get" class="quick-search-form">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="flaticon2-search-1"></i>
            </span>
          </div>
          <input
            v-model="search"
            type="text"
            class="form-control quick-search-input"
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBarCustomerListTable",
  components: {},
  props: {
    isOcean: {
      type: Boolean,
      requried: true
    },
    fs_key: {
      type: String,
      requried: true
    }
  },
  data() {
    return {
      searchString: ""
    };
  },
  computed: {
    search: {
      get() {
        return this.searchString;
      },
      set(searchString) {
        this.$emit("input", searchString);
      }
    }
  }
};
</script>
