<template>
  <div class="d-flex flex-column flex-root">
    <CentreLoader v-if="isLoading"></CentreLoader>
    <div
      class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      :class="{
        'login-signin-on': this.state == 'signin',
        'login-signup-on': this.state == 'signup',
        'login-forgot-on': this.state == 'forgot'
      }"
      id="kt_login"
    >
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #f2c98a"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a href="#" class="text-center mb-10">
            <img
              src="media/logos/logo-letter-1.png"
              class="max-h-70px"
              alt=""
            />
          </a>
          <h3
            class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
            style="color: #986923"
          >
            Discover Amazing Future <br />with Finestuido
          </h3>
        </div>
        <div
          class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
      </div>
      <!--begin::Aside-->
      <!--begin::Content-->
      <div
        class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
      >
        <div class="d-flex flex-column-fluid flex-center">
          <!--begin::Signin-->
          <div class="login-form login-signin">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_signin_form"
              @submit.stop.prevent="onSubmitLogin()"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  Admin panel
                </h3>
                <span class="text-muted font-weight-bold font-size-h4"
                  >New Here?
                  <a
                    id="kt_login_signup"
                    class="text-primary font-weight-bolder"
                    @click="showForm('signup')"
                    >Create an Account</a
                  ></span
                >
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >Email</label
                >
                <div
                  id="example-input-group-1"
                  label=""
                  label-for="example-input-1"
                >
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="text"
                    name="email"
                    ref="email"
                    :value="form.email"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex justify-content-between mt-n5">
                  <label class="font-size-h6 font-weight-bolder text-dark pt-5"
                    >Password</label
                  >
                  <a
                    class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                    id="kt_login_forgot"
                    @click="showForm('forgot')"
                    >Forgot Password ?</a
                  >
                </div>
                <div
                  id="example-input-group-2"
                  label=""
                  label-for="example-input-2"
                >
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="password"
                    name="password"
                    ref="password"
                    :value="form.password"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="pb-lg-0 pb-5">
                <button
                  :disabled="isLoading"
                  ref="kt_login_signin_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <!--end::Signin-->
          <!--begin::Signup-->
          <div class="login-form login-signup">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_signup_form"
              @submit.stop.prevent="onSubmitRegister()"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  Sign Up
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  Enter your details to create your account
                </p>
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >用户名</label
                >
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  placeholder="Login Name"
                  name="login"
                  ref="rlogin"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >邮箱</label
                >
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref="remail"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >昵称</label
                >
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  placeholder="Firstname Lastname"
                  name="display"
                  ref="rdisplay"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >密码</label
                >
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref="rpassword"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >重新输入密码</label
                >
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Confirm password"
                  name="cpassword"
                  ref="cpassword"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >激活码</label
                >
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  placeholder="Activation Code"
                  name="actcod"
                  ref="ractcod"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="checkbox mb-0">
                  <input type="checkbox" name="agree" />
                  <span class="mr-2"></span>
                  I Agree the
                  <a href="#" class="ml-2">terms and conditions</a>.
                </label>
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
                <button
                  :disabled="isLoading"
                  ref="kt_login_signup_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  style="width: 150px"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="kt_login_signup_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <!--end::Signup-->
          <!--begin::Forgot-->
          <div class="login-form login-forgot">
            <!--begin::Form-->
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_forgot_form"
              ref="kt_login_forgot_form"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  Forgotten Password ?
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  Enter your email to reset your password
                </p>
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Email"
                  name="email"
                  autocomplete="off"
                />
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0">
                <button
                  type="button"
                  id="kt_login_forgot_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <!--end::Forgot-->
        </div>
        <!--begin::Content footer-->
        <div
          class="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0"
        >
          <a href="#" class="text-primary font-weight-bolder font-size-h5"
            >Terms</a
          >
          <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
            >Plans</a
          >
          <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
            >Contact Us</a
          >
        </div>
        <!--end::Content footer-->
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import formValidation from "@/assets/plugins/formvalidation/dist/es6/core/Core";
// FormValidation plugins
import Trigger from "@/assets/plugins/formvalidation/dist/es6/plugins/Trigger";
import Bootstrap from "@/assets/plugins/formvalidation/dist/es6/plugins/Bootstrap";
import SubmitButton from "@/assets/plugins/formvalidation/dist/es6/plugins/SubmitButton";
import KTUtil from "@/assets/js/components/util";
import { mapGetters, mapState } from "vuex";
import { LOGIN, LOGOUT, REGISTER } from "@/core/services/store/auth.module";
import { NOTIFICATION_INIT } from "@/core/services/store/notification.module";
import CentreLoader from "@/view/content/widgets/CentreLoader";
import { delay } from "@/core/services/delayLoading";
import { getToastConfig } from "@/core/services/toastStyleService";

export default {
  name: "login-1",
  components: {
    CentreLoader
  },
  data() {
    return {
      state: "signin",
      form: {
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser"]),

    backgroundImage() {
      return (
        process.env.BASE_URL + "media/svg/illustrations/login-visual-1.svg"
      );
    }
  },
  mounted() {
    const signin_form = KTUtil.getById("kt_login_signin_form");
    const signup_form = KTUtil.getById("kt_login_signup_form");
    const forgot_form = KTUtil.getById("kt_login_forgot_form");

    this.fv = formValidation(signin_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Username is required"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "Password is required"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });

    this.fv1 = formValidation(signup_form, {
      fields: {
        login: {
          validators: {
            notEmpty: {
              message: "Login name is required"
            }
          }
        },
        display: {
          validators: {
            notEmpty: {
              message: "Display name is required"
            }
          }
        },
        actcod: {
          validators: {
            notEmpty: {
              message: "Activation code is required"
            }
          }
        },
        email: {
          validators: {
            notEmpty: {
              message: "Email is required"
            },
            emailAddress: {
              message: "The value is not a valid email address"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "Password is required"
            }
          }
        },
        cpassword: {
          validators: {
            notEmpty: {
              message: "Confirm password is required"
            },
            identical: {
              compare: function() {
                return signup_form.querySelector('[name="password"]').value;
              },
              message: "The password and its confirm are not the same"
            }
          }
        },
        agree: {
          validators: {
            notEmpty: {
              message: "You should agree terms and conditions"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });

    this.fv2 = formValidation(forgot_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Email is required"
            },
            emailAddress: {
              message: "The value is not a valid email address"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });
  },
  methods: {
    toast(title, body, variant) {
      this.counter++;
      this.$bvToast.toast(body, getToastConfig(title, variant));
    },
    showForm(form) {
      this.state = form;
      var form_name = "kt_login_" + form + "_form";
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        "animate__animated animate__backInUp"
      );
    },

    onSubmitLogin() {
      this.emergSingleValidationProcess(this.fv).then(() => {
        const email = this.$refs.email.value;
        const password = this.$refs.password.value;

        this.isLoading = true;
        this.form.email = email;
        this.form.password = password;

        // clear existing errors
        this.$store.dispatch(LOGOUT);

        // set spinner to submit button
        const submitButton = this.$refs["kt_login_signup_submit"];
        submitButton.classList.add("spinner", "spinner-light", "spinner-right");

        delay().then(async () => {
          await this.$store
            .dispatch(LOGIN, { email, password })
            // go to which page after successfully login
            .then(({ fs_key }) => {
              // init notification centre
              this.$store.dispatch(NOTIFICATION_INIT, fs_key);
              this.$router.push({ name: "dashboard" });
            })
            .catch(response => {
              if (response) {
                this.toast("Login Failed", response, "danger");
              } else {
                this.toast(
                  "Network Error",
                  "Please check your network and try again.",
                  "danger"
                );
              }
            });

          this.isLoading = false;

          submitButton.classList.remove(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
        });
      });
      // this.fv.validate();

      // this.fv.on("core.form.valid", () => {
      //   var email = this.$refs.email.value;
      //   var password = this.$refs.password.value;

      //   // clear existing errors
      //   this.$store.dispatch(LOGOUT);

      //   // set spinner to submit button
      //   const submitButton = this.$refs["kt_login_signin_submit"];
      //   submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      //   // dummy delay
      //   setTimeout(() => {
      //     // send login request
      //     this.$store
      //       .dispatch(LOGIN, { email, password })
      //       // go to which page after successfully login
      //       .then(() => this.$router.push({ name: "dashboard" }))
      //       .catch((response) => {
      //         console.log(response);
      //         if (response) {
      //           this.toast("Login Failed", response, "danger");
      //         }
      //       });

      //     submitButton.classList.remove(
      //       "spinner",
      //       "spinner-light",
      //       "spinner-right"
      //     );
      //   }, 2000);
      // });

      // this.fv.on("core.form.invalid", () => {
      //   Swal.fire({
      //     title: "",
      //     text: "Please, provide correct data!",
      //     icon: "error",
      //     confirmButtonClass: "btn btn-secondary",
      //     heightAuto: false
      //   });
      // });
    },
    emergSingleValidationProcess(form) {
      return new Promise((resolve, reject) => {
        form.validate();
        form.on("core.form.valid", () => {
          resolve();
        });
        form.on("core.form.invalid", () => {
          reject();
        });
      });
    },
    onSubmitRegister() {
      this.emergSingleValidationProcess(this.fv1).then(() => {
        const login = this.$refs.rlogin.value;
        const email = this.$refs.remail.value;
        const password = this.$refs.rpassword.value;
        const display_name = this.$refs.rdisplay.value;
        const actcod = this.$refs.ractcod.value;

        this.isLoading = true;

        if (/^[0-9]*$/.test(login)) {
          this.toast(
            "Format error",
            "Login name must contain at least one letter.",
            "danger"
          );
          return;
        }

        // clear existing errors
        this.$store.dispatch(LOGOUT);

        // set spinner to submit button
        const submitButton = this.$refs["kt_login_signup_submit"];
        submitButton.classList.add("spinner", "spinner-light", "spinner-right");

        delay().then(async () => {
          await this.$store
            .dispatch(REGISTER, {
              username: login,
              email: email,
              password: password,
              display_name: display_name,
              act_code: actcod
            })
            .then(response => {
              this.toast("Signup Successful", response, "success");
              this.showForm("signin");
            })
            .catch(response => this.toast("Signup Failed", response, "danger"));

          this.isLoading = false;

          submitButton.classList.remove(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
        });
      });

      // this.fv1.validate();

      // this.fv1.on("core.form.valid", () => {
      //   const login = this.$refs.rlogin.value;
      //   const email = this.$refs.remail.value;
      //   const password = this.$refs.rpassword.value;
      //   const display_name = this.$refs.rdisplay.value;
      //   const actcod = this.$refs.ractcod.value;

      //   // clear existing errors
      //   this.$store.dispatch(LOGOUT);

      //   // set spinner to submit button
      //   const submitButton = this.$refs["kt_login_signup_submit"];
      //   submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      //   // dummy delay
      //   setTimeout(() => {
      //     // send register request
      //     this.$store
      //       .dispatch(REGISTER, {
      //         username: login,
      //         email: email,
      //         password: password,
      //         display_name: display_name,
      //         act_code: actcod
      //       })
      //       .then(() => this.$router.push({ name: "dashboard" }))
      //       .catch((response) => this.toast("Signup Failed", response));

      //     submitButton.classList.remove(
      //       "spinner",
      //       "spinner-light",
      //       "spinner-right"
      //     );
      //   }, 2000);
      // });

      // this.fv1.on("core.form.invalid", () => {
      //   Swal.fire({
      //     title: "",
      //     text: "Please, provide correct data!",
      //     icon: "error",
      //     confirmButtonClass: "btn btn-secondary",
      //     heightAuto: false
      //   });
      // });
    }
  }
};
</script>
