import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyCPXNj1W900IzmNnbxSSWTMS_Zc_Vbyaeg",
  authDomain: "library-2ace2.firebaseapp.com",
  projectId: "library-2ace2",
  storageBucket: "library-2ace2.appspot.com",
  messagingSenderId: "708040961693",
  appId: "1:708040961693:web:18f0db1c0c909338c72e74",
  measurementId: "G-V4RGF6EEG1",
};
// Initialize Firebase

// firebase.analytics();
const db = firebase.initializeApp(firebaseConfig);
const fbauth = firebase.auth();
export { fbauth };

export default db.database().ref();
// Initialize Firebase
// firebase.analytics();
