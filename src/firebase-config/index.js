// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyAuo3xd1EvRjX8XnIDuU2EJWJkEQihlQFg",
    authDomain: "ecommerce-da802.firebaseapp.com",
    projectId: "ecommerce-da802",
    storageBucket: "ecommerce-da802.appspot.com",
    messagingSenderId: "711476848374",
    appId: "1:711476848374:web:e4f6ebee3a11f4563aeed7",
    measurementId: "G-EV5H670WEX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
