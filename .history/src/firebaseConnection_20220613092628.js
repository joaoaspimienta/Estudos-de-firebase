import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyBM8zXTuMB9OuHMgazGoDHqoWQcRxFFhw8",
  authDomain: "react-zero-ao-avancado.firebaseapp.com",
  projectId: "react-zero-ao-avancado",
  storageBucket: "react-zero-ao-avancado.appspot.com",
  messagingSenderId: "829524555310",
  appId: "1:829524555310:web:21abf5fa7f77d62df511bf",
  measurementId: "G-5HZY1965W8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
