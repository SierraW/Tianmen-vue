import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const em_chat = db.collection("em_chat");
const em_customers = db.collection("em_customers");
const em_histories = db.collection("em_cus_histories");

export {
	firebase,
	db,
	auth,
	em_chat,
	em_customers,
	em_histories
};