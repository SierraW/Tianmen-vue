import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyCr7mlhM9TaOJlp1b0C1YMgYeTnDC0-eBw",
	authDomain: "em-webchat.firebaseapp.com",
	databaseURL: "https://em-webchat.firebaseio.com",
	projectId: "em-webchat",
	storageBucket: "em-webchat.appspot.com",
	messagingSenderId: "697971955980",
	appId: "1:697971955980:web:0313f55ba11ca1c18b1129"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const em_chat = db.collection('em_chat');

export {
	db,
	auth,
	em_chat
};