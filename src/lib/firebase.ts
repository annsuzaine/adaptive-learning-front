import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration (Replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyD8fP_F47FMY2kxiGNcHIcgx-TMNFLbLfs",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };
