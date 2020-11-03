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

function em_categories(fs_key) {
  return em.doc(fs_key).collection("em_cus_categories");
}

function timestamp(date = new Date()) {
  return firebase.firestore.Timestamp.fromDate(date);
}

// daily message top chart
function em_ass(fs_key, mode) {
  var date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  const dateString = [date.getFullYear(), date.getMonth()].join("-");
  return em.doc(fs_key).collection(`em_ass/${mode}/${dateString}`);
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
  em_categories,
  em_ass,
  timestamp
};
