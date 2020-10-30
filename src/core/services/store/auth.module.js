import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PASSWORD = "setPassword";
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
  userHeadBaseUri(state) {
    return state.userHeadBaseUri;
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
            resolve(data);
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
          context.commit(PURGE_AUTH);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_PASSWORD](context, payload) {
    const password = payload;

    return ApiService.put("password", password).then(({ data }) => {
      context.commit(SET_PASSWORD, data);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.user_session);
  },
  [SET_PASSWORD](state, password) {
    state.user.password = password;
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
