<template>
  <div>
    <b-form-group
      id="input-group-tra"
      :label="$t('CUSTOMER.DATA.TRA')"
      label-for="input-tra"
    >
      <b-form-select
        id="input-tra"
        v-model="sourceAndCategory.source"
        :options="sources"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      id="input-group-cat"
      :label="$t('CUSTOMER.DATA.CAT')"
      label-for="input-cat"
    >
      <b-form-select
        id="input-cat"
        v-model="sourceAndCategory.category"
        :options="categories"
      ></b-form-select>
    </b-form-group>
  </div>
</template>

<script>
import { em_sources, em_categories } from "@/core/services/firebaseInit";

export default {
  name: "CDFormSource",
  data() {
    return {
      sources: [],
      categories: []
    };
  },
  created() {
    var instance = this;
    em_sources(this.fs_key)
      .get()
      .then(function(querySnapshot) {
        var resultItems = [
          {
            value: "",
            text: instance.$t("SOURCE.EMPTY")
          }
        ];
        querySnapshot.forEach(function(doc) {
          resultItems.push({
            value: doc.data().name,
            text: doc.data().name
          });
        });
        if (resultItems.length > 0) {
          instance.sources = resultItems;
        } else {
          instance.sources = [
            {
              value: "",
              text: "Empty..."
            }
          ];
        }
      });
    em_categories(this.fs_key)
      .get()
      .then(function(querySnapshot) {
        var resultItems = [
          {
            value: "",
            text: instance.$t("SOURCE.EMPTY")
          }
        ];
        querySnapshot.forEach(function(doc) {
          resultItems.push({
            value: doc.data().name,
            text: doc.data().name
          });
        });
        if (resultItems.length > 0) {
          instance.categories = resultItems;
        } else {
          instance.categories = [
            {
              value: "",
              text: "Empty..."
            }
          ];
        }
      });
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    fs_key: {
      type: String,
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
