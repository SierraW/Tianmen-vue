<template>
  <b-form-group
    id="input-group-tra"
    :label="$t('CUSTOMER.DATA.TRA')"
    label-for="input-tra"
  >
    <b-form-input
      id="input-tra"
      v-model="trace"
      required
      :placeholder="$t('CUSTOMER.DATA.TRA_PLA')"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: "CDFormSource",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    trace: {
      get() {
        return this.value;
      },
      set(trace) {
        this.$emit("input", trace);
      }
    }
  },
  watch: {
    trace: {
      handler(newVal) {
        this.$emit("input", newVal);
      },
      deep: true
    }
  }
};
</script>
