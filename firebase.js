// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAFsBdeXFKa-eI7X0TIkl4rV1_BDc57cQ",
  authDomain: "nanotech-2fe77.firebaseapp.com",
  // Copy from Firebase project settings
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
