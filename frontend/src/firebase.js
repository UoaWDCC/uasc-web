// setup firebase
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVkhnuTBofnvjRXzwB9YmPKzkZm3Pa920",
  authDomain: "uasc-ceebc.firebaseapp.com",
  projectId: "uasc-ceebc",
  storageBucket: "uasc-ceebc.appspot.com",
  messagingSenderId: "270675768091",
  appId: "1:270675768091:web:ea81f130925433bf5219be",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
