import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCQNEwgM3fonfap5Wuad3CAHU5PVF8BEZY",
    authDomain: "snapchat-e12e0.firebaseapp.com",
    projectId: "snapchat-e12e0",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
    storageBucket: "snapchat-e12e0.appspot.com",
  });
}

// export const db = firebaseApp.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
