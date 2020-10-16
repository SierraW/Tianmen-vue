<template>
  <div>
    <div class="row">
      <div class="col-xl-12">
        <!--begin::Tiles Widget 13-->
        <div
          class="card card-custom bgi-no-repeat gutter-b"
          style="height: 220px; background-color: #663259; background-position: calc(100% + 0.5rem) 100%; background-size: 100% auto; background-image: url(/media/svg/patterns/taieri.svg)"
        >
          <!--begin::Body-->
          <div class="card-body d-flex align-items-center">
            <div>
              <h3 class="text-white font-weight-bolder line-height-lg mb-5">
                Create SaaS <br />Based Reports
              </h3>
              <a href="#" class="btn btn-success font-weight-bold px-6 py-3"
                >Create Report</a
              >
            </div>
          </div>
          <!--end::Body-->
        </div>
        <!--end::Tiles Widget 13-->
        <div class="row">
          <div class="col-xl-6">
            <!--begin::Tiles Widget 11-->
            <div
              class="card card-custom bg-primary gutter-b"
              style="height: 150px"
            >
              <div class="card-body">
                <span class="svg-icon svg-icon-3x svg-icon-white ml-n2">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
                  <inline-svg
                    src="media/svg/icons/Layout/Layout-4-blocks.svg"
                  />
                  <!--end::Svg Icon-->
                </span>
                <div
                  class="text-inverse-primary font-weight-bolder font-size-h2 mt-3"
                >
                  790
                </div>
                <a
                  href="#"
                  class="text-inverse-primary font-weight-bold font-size-lg mt-1"
                  >New Products</a
                >
              </div>
            </div>
            <!--end::Tiles Widget 11-->
          </div>
          <div class="col-xl-6">
            <!--begin::Tiles Widget 12-->
            <div class="card card-custom gutter-b" style="height: 150px">
              <div class="card-body">
                <span class="svg-icon svg-icon-3x svg-icon-success">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Group.svg-->
                  <inline-svg src="/media/svg/icons/Communication/Group.svg" />
                  <!--end::Svg Icon-->
                </span>
                <div class="text-dark font-weight-bolder font-size-h2 mt-3">
                  8,600
                </div>
                <a
                  href="#"
                  class="text-muted text-hover-primary font-weight-bold font-size-lg mt-1"
                  >New Customers</a
                >
              </div>
            </div>
            <!--end::Tiles Widget 12-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyWidget",
  components: {},
  computed: {
    ...mapGetters(["layoutConfig"])
  }
};
</script>
