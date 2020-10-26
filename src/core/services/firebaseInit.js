import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const em_chat = db.collection("em_chat");
const em = db.collection("em_company");

function em_customers(fs_key) {
  return em.doc(fs_key).collection("em_customers");
}

function em_histories(fs_key) {
  return em.doc(fs_key).collection("em_cus_histories");
}

function em_sources(fs_key) {
  return em.doc(fs_key).collection("em_cus_sources");
}

function timestamp() {
  return firebase.firestore.Timestamp.fromDate(new Date());
}

export {
  firebase,
  db,
  auth,
  em,
  em_chat,
  em_customers,
  em_histories,
  em_sources,
  timestamp
};
