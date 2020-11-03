import { em_histories } from "@/core/services/firebaseInit";
// action types
export const VIEW_NEW_CUS = "viewNewCustomer";
export const NOTIFICATION_INIT = "notificationServicesInit";

// mutation types
export const SET_VIEW = "setViewNewCustomer";
export const SET_NEW = "setNewestCustomer";

// cookie
const BROWSE_HISTORY = "history";

const state = {
  lastViewId: "",
  newestId: ""
};

const getters = {
  hasNewCustomer(state) {
    return state.lastViewId !== state.newestId;
  },
  getLastestCreatedCustomerId(state) {
    return state.newestId;
  }
};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const actions = {
  [NOTIFICATION_INIT](context, fs_key) {
    if (getCookie(BROWSE_HISTORY) != "") {
      context.commit(SET_VIEW, getCookie(BROWSE_HISTORY));
    }
    em_histories(fs_key)
      .where("type", "==", "create")
      .orderBy("time", "desc")
      .limit(1)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          context.commit(SET_NEW, doc.id);
        });
      });
  },
  [VIEW_NEW_CUS](context, newestId) {
    context.commit(SET_VIEW);
    setCookie(BROWSE_HISTORY, newestId, 30);
  }
};

const mutations = {
  [SET_VIEW](state) {
    state.lastViewId = state.newestId;
  },
  [SET_NEW](state, info) {
    state.newestId = info;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
