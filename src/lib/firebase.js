// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-a9310.firebaseapp.com",
  projectId: "reactchat-a9310",
  storageBucket: "reactchat-a9310.appspot.com",
  messagingSenderId: "154647186876",
  appId: "1:154647186876:web:52e78d00c9bd7a7d8eafb9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
