import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"

const app = firebase.initializeApp({
	apiKey: "AIzaSyCzjUn1lOepdWYWdvs8dZkURJ1vCXWs11A",
  authDomain: "file-repodev.firebaseapp.com",
  projectId: "file-repodev",
  storageBucket: "file-repodev.appspot.com",
  messagingSenderId: "336141643192",
  appId: "1:336141643192:web:6e5c6215439028bb1ff34d"
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

export const database2 = {
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
