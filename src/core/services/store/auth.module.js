import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import Swal from "sweetalert2";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";
export const UPDATE_PERSONAL_INFO = "updatePersonalInfo";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PERSONAL_INFO = "setPersonalInfo";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  userHeadBaseUri: "http://tianmengroup.com/server/heads/",
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  userHeadUri(state) {
    if (state.user.head) {
      return state.userHeadBaseUri + state.user.head;
    } else {
      return "media/users/blank.png";
    }
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("postLogin.php", credentials)
        .then(({ data }) => {
          if (data.success == "failed") {
            reject(data.message);
          } else {
            context.commit(SET_AUTH, data.data);
            resolve(data.data);
          }
        })
        .catch(response => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("signup.php", credentials)
        .then(({ data }) => {
          if (data.success == "success") {
            // context.commit(SET_AUTH, data.data);
            resolve(data.message);
          } else {
            reject(data.message);
          }
        })
        .catch(response => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [VERIFY_AUTH](context) {
    const token = JwtService.getToken();
    if (token) {
      const payload = {
        token
      };
      ApiService.post("verify.php", payload)
        .then(({ data }) => {
          if (data.success == "success") {
            context.commit(SET_AUTH, data.data);
          } else {
            throw new Error(data.message);
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Login Expired",
            text:
              "Your login infomations are now expired, please refresh this page!",
            icon: "error"
          });
          context.commit(PURGE_AUTH);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_PERSONAL_INFO](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("setPersonalInfo.php", payload)
        .then(({ data }) => {
          if (data.success == "success") {
            context.commit(SET_PERSONAL_INFO, payload);
            resolve(true);
          } else {
            reject("Email already in-use.");
          }
        })
        .catch(response => {
          reject(response);
        });
    });
  },
  [UPDATE_PASSWORD](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("setPassword.php", payload)
        .then(({ data }) => {
          if (data.success == "success") {
            resolve(data.message);
          } else {
            reject(data.message);
          }
        })
        .catch(response => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_PERSONAL_INFO](state, info) {
    if (info.head !== "null") {
      state.user.head = info.head;
    }

    state.user.user_email = info.user_email;
    state.user.display_name = info.display_name;
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.user_session);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
