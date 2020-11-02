<template>
  <!--begin::Card-->
  <div class="card card-custom">
    <!--begin::Header-->
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          Personal Information
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1"
          >Update your personal informaiton</span
        >
      </div>
      <div class="card-toolbar">
        <button
          type="reset"
          class="btn btn-success mr-2"
          @click="save()"
          ref="kt_save_changes"
        >
          Save Changes
        </button>
        <button type="reset" class="btn btn-secondary" @click="cancel()">
          Cancel
        </button>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Form-->
    <form class="form">
      <!--begin::Body-->
      <div class="card-body">
        <div class="row">
          <label class="col-xl-3"></label>
          <div class="col-lg-9 col-xl-6">
            <h5 class="font-weight-bold mb-6">Customer Info</h5>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label text-right"
            >Avatar</label
          >
          <div class="col-lg-9 col-xl-6">
            <div class="image-input image-input-outline" id="kt_profile_avatar">
              <div
                class="image-input-wrapper"
                :style="{ backgroundImage: `url(${photo})` }"
              ></div>
              <label
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="change"
                data-toggle="tooltip"
                title=""
                data-original-title="Change avatar"
              >
                <i class="fa fa-pen icon-sm text-muted"></i>
                <input
                  type="file"
                  name="profile_avatar"
                  accept=".png, .jpg, .jpeg"
                  @change="onFileChange($event)"
                />
                <input type="hidden" name="profile_avatar_remove" />
              </label>
              <span
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="cancel"
                data-toggle="tooltip"
                title="Cancel avatar"
              >
                <i class="ki ki-bold-close icon-xs text-muted"></i>
              </span>
              <span
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="remove"
                data-toggle="tooltip"
                title="Remove avatar"
                @click="current_photo = null"
              >
                <i class="ki ki-bold-close icon-xs text-muted"></i>
              </span>
            </div>
            <span class="form-text text-muted"
              >Allowed file types: png, jpg, jpeg.</span
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label text-right"
            >Display Name</label
          >
          <div class="col-lg-9 col-xl-6">
            <input
              ref="display"
              class="form-control form-control-lg form-control-solid"
              type="text"
              v-bind:value="currentUser.display_name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label text-right"
            >Email Address</label
          >
          <div class="col-lg-9 col-xl-6">
            <div class="input-group input-group-lg input-group-solid">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="la la-at"></i>
                </span>
              </div>
              <input
                ref="email"
                type="text"
                class="form-control form-control-lg form-control-solid"
                placeholder="Email"
                v-bind:value="currentUser.user_email"
              />
            </div>
          </div>
        </div>
      </div>
      <!--end::Body-->
    </form>
    <!--end::Form-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "PersonalInformation",
  data() {
    return {
      current_photo: null,
    };
  },
  methods: {
    save() {

      // set spinner to submit button
      const submitButton = this.$refs["kt_save_changes"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        // send update request

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    },
    cancel() {
      this.$refs.display.value = this.currentUser.display_name;
      this.$refs.email.value = this.currentUser.user_email;
      this.current_photo = this.currentUser.head;
    },
    onFileChange(e) {
      const file = e.target.files[0];

      let formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://tianmengroup.com/server/upload.php", formData)
        .then(({ data }) => {
          console.log("success", data);
        })
        .catch(({ response }) => {
          console.log("failed", response);
        });

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.current_photo = event.target.result;
        };

        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
  },
  computed: {
    ...mapGetters(["currentUser", "userHeadUri"]),
    photo() {
      return this.current_photo == null
        ? this.userHeadUri
        : this.current_photo;
    },
  },
};
</script>
