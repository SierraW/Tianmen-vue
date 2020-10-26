<template>
  <div>
    <b-form-group
      id="input-group-tra"
      :label="$t('CUSTOMER.DATA.TRA')"
      label-for="input-tra"
    >
      <b-form-input
        id="input-tra"
        v-model="sourceAndCategory.source"
        required
        :placeholder="$t('CUSTOMER.DATA.TRA_PLA')"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-cat"
      :label="$t('CUSTOMER.DATA.CAT')"
      label-for="input-cat"
    >
      <b-form-input
        id="input-cat"
        v-model="sourceAndCategory.category"
        required
        :placeholder="$t('CUSTOMER.DATA.CAT_PLA')"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "CDFormSource",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    sourceAndCategory: {
      get() {
        return this.value;
      },
      set(sourceAndCategory) {
        this.$emit("input", sourceAndCategory);
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
