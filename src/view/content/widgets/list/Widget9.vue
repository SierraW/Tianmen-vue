<template>
  <div>
    <div class="row">
      <div class="col-xl-3">
        <!--begin::Tiles Widget 3-->
        <div
          class="card card-custom bgi-no-repeat bgi-no-repeat bgi-size-cover gutter-b"
          style="height: 150px; background-image: url(/media/bg/bg-9.jpg)"
        >
          <!--begin::Body-->
          <div class="card-body d-flex flex-column">
            <!--begin::Title-->
            <a
              href="#"
              class="text-dark-75 text-hover-primary font-weight-bolder font-size-h3"
              >Properties</a
            >
            <!--end::Title-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Tiles Widget 3-->
      </div>
      <div class="col-xl-9">
        <!--begin::Mixed Widget 10-->
        <div class="card card-custom gutter-b" style="height: 150px">
          <!--begin::Body-->
          <div
            class="card-body d-flex align-items-center justify-content-between flex-wrap"
          >
            <div class="mr-2">
              <h3 class="font-weight-bolder">Create CRM Reports</h3>
              <div class="text-dark-50 font-size-lg mt-2">
                Generate the latest CRM Report
              </div>
            </div>
            <a href="#" class="btn btn-primary font-weight-bold py-3 px-6"
              >Start Now</a
            >
          </div>
          <!--end::Body-->
        </div>
        <!--end::Mixed Widget 10-->
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <!--begin::Tiles Widget 13-->
        <div
          class="card card-custom bgi-no-repeat gutter-b"
          style="height: 175px; background-color: #663259; background-position: calc(100% + 0.5rem) 100%; background-size: 100% auto; background-image: url(/media/svg/patterns/taieri.svg)"
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
      <div class="col-xl-6">
        <!--begin::Mixed Widget 14-->
        <div
          class="card card-custom bgi-no-repeat bgi-size-cover gutter-b card-stretch"
          style="background-image: url(/media/stock-600x600/img-16.jpg)"
        >
          <!--begin::Body-->
          <div
            class="card-body d-flex flex-column align-items-start justify-content-start"
          >
            <div class="p-1 flex-grow-1">
              <h3 class="text-white font-weight-bolder line-height-lg mb-5">
                Create Reports <br />With App
              </h3>
            </div>
            <a href="#" class="btn btn-link btn-link-warning font-weight-bold"
              >Create Report
              <span class="svg-icon svg-icon-lg svg-icon-warning">
                <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Arrow-right.svg-->
                <inline-svg src="media/svg/icons/Navigation/Arrow-right.svg" />
                <!--end::Svg Icon-->
              </span></a
            >
          </div>
          <!--end::Body-->
        </div>
        <!--end::Mixed Widget 14-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "widget-9",
  data() {
    return {
      list: [
        {
          time: "08:42",
          desc: "Outlines of the recent activities that happened last weekend",
          badge: "fa fa-genderless text-success"
        },
        {
          time: "3 hr",
          desc: "AEOL meeting",
          bold: true,
          badge: "fa fa-genderless text-danger"
        },
        {
          time: "14:37",
          desc: `Submit initial budget - <a href="#" class="text-primary">USD 700</a>.`,
          badge: "fa fa-genderless text-info",
          bold: true
        },
        {
          time: "16:50",
          desc: "Stakeholder meeting scheduling.",
          badge: "fa fa-genderless text-danger"
        },
        {
          time: "17:30",
          desc: "Project scoping & estimations with stakeholders.",
          badge: "fa fa-genderless text-success"
        },
        {
          time: "21:03",
          desc: `New order placed <a href="#" class="text-primary">#XF-2356</a>.`,
          badge: "fa fa-genderless text-warning",
          bold: true
        },
        {
          time: "21:07",
          desc:
            "Company BBQ to celebrate the last quater achievements and goals.",
          badge: "fa fa-genderless text-danger"
        },
        {
          time: "20:30",
          desc: "Marketing campaign planning with customer.",
          badge: "fa fa-genderless text-info"
        }
      ]
    };
  },
  components: {},
  computed: {
    ...mapGetters(["layoutConfig"])
  }
};
</script>
