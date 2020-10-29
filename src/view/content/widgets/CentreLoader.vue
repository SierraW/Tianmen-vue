<template>
  <div>
    <b-modal
      no-close-on-backdrop
      size="sm"
      v-model="show"
      hide-header
      hide-footer
      centered
      title="BootstrapVue"
    >
      <div class="text-center my-10">
        <p class="mb-3">{{ message }}</p>
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
        <p class="mt-6"><b-button @click="toggleCancel" variant="danger" v-if="isCancelable">Cancel</b-button></p>
        
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CentreLoader",
  props: {
    isCancelable: {
      type: Boolean,
      requried: false
    }
  },
  data() {
    return {
      show: true,
      cancel: false,
      message: "加载中..."
    };
  },
  methods: {
    toggleCancel() {
      this.isCanceled = true;
      this.message = "正在取消..."
    }
  },
  computed: {
    isCanceled: {
      get() {
        return this.cancel;
      },
      set(cancel) {
        this.$emit("input", cancel);
      }
    }
  }
};
</script>
