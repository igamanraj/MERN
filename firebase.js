// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";

const VITE_APP_FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const VITE_APP_FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
  apiKey: VITE_APP_FIREBASE_API_KEY,
  authDomain: VITE_APP_FIREBASE_AUTH_DOMAIN,
  // Copy from Firebase project settings
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithRedirect, getRedirectResult , signInWithPopup };
