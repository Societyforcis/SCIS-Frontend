import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa1PaQvF1b7r_zEZV9VqEOm9xto0bDya4",
  authDomain: "societycis.firebaseapp.com",
  projectId: "societycis",
  storageBucket: "societycis.firebasestorage.app",
  messagingSenderId: "443163056784",
  appId: "1:443163056784:web:b4ef78c9b6dd39a5489615"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
