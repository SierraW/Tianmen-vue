import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME
} from "@/core/services/store/htmlclass.module.js";

var delay = function(ms = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

function pageLoading(store, callback, ms = 1000) {
  store.dispatch(ADD_BODY_CLASSNAME, "page-loading");
  callback();
  delay(ms).then(() => {
    store.dispatch(REMOVE_BODY_CLASSNAME, "page-loading");
  });
}

function delayCancelable(beforeLoad, loading, afterLoad, condition, ms = 3500) {
  beforeLoad();
  delay(ms).then(() => {
    if (!condition()) {
      loading();
    }
    afterLoad();
  });
}

export { delay, pageLoading, delayCancelable };
