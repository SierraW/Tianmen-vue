<template>
  <div>
    <div class="card card-custom gutter-b">
      <KTWidget2></KTWidget2>
    </div>
    <div class="card card-custom gutter-b">
      <KTWidget3></KTWidget3>
    </div>
  </div>
</template>

<script>
import KTWidget2 from "@/view/pages/user_data/profile-comp/Widget2";
import KTWidget3 from "@/view/pages/user_data/profile-comp/Widget3";

export default {
  name: "ProfileOverview",
  components: {
    KTWidget2,
    KTWidget3
  }
};
</script>

<style scoped></style>
