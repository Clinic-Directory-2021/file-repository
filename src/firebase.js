import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const firestore = app.firestore()
export const database = {
	folders: firestore.collection("folders"),
	files: firestore.collection("files"),
	formatDoc: doc => {
		return { id: doc.id, ...doc.data() }
	},
	getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = app.storage()
export const auth = app.auth();
export default app;



/* DEFAULT AUTH
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
	match /{document=**} {
	allow read, write: if
	request.time < timestamp.date(2022,12,31)
	}
  }
}
*/

/* FOR AUTHENTICATION OF EACH USER ON THEIR FILES (1:11)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
	match /{document=**} {
	function authed () {
		return request.auth !=null
	}
	function matchesUser(data){
		return request.auth.uid == data.userId
	}
	allow read: if authed() && matchesUser(resource.data)
	allow create: if authed() && matchesUser(request.resource.data)
	}
  }
}
*/
