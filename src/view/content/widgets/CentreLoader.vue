<template>
  <b-modal
    size="sm"
    v-model="show"
    hide-header
    hide-footer
    centered
    title="BootstrapVue"
  >
    <div class="text-center my-10">
      <p class="mb-3">加载中...</p>
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "CentreLoader",
  data() {
    return {
      show: true,
    };
  },
};
</script>