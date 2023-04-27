// setup firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVkhnuTBofnvjRXzwB9YmPKzkZm3Pa920",
  authDomain: "uasc-ceebc.firebaseapp.com",
  projectId: "uasc-ceebc",
  storageBucket: "uasc-ceebc.appspot.com",
  messagingSenderId: "270675768091",
  appId: "1:270675768091:web:ea81f130925433bf5219be"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
