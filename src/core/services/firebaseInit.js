import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const em_chat = db.collection("em_chat");
const em_customers = "em_customers";
const em_histories = "em_cus_histories";
const em = db.collection("em_company");

export {
	firebase,
	db,
	auth,
	em,
	em_chat,
	em_customers,
	em_histories
};