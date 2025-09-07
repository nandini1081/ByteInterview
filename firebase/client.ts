// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSJx2lJ-ZI2HdF0C6NhbM5pVrfnfX_rXg",
  authDomain: "byteinterview-1ee05.firebaseapp.com",
  projectId: "byteinterview-1ee05",
  storageBucket: "byteinterview-1ee05.firebasestorage.app",
  messagingSenderId: "718817359157",
  appId: "1:718817359157:web:24e034f51dba23b5af487c",
  measurementId: "G-C9850VWFCS"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);