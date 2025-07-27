import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjqLggbUNMT3taPd-xTkcfF4Hjkezq0zQ",
  authDomain: "cyber-societycis.firebaseapp.com",
  projectId: "cyber-societycis",
  storageBucket: "cyber-societycis.firebasestorage.app",
  messagingSenderId: "912756369690",
  appId: "1:912756369690:web:d59467d2938c65f28fe4a3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
