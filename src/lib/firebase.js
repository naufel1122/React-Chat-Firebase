import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-aafdb.firebaseapp.com",
  projectId: "reactchat-aafdb",
  storageBucket: "reactchat-aafdb.appspot.com",
  messagingSenderId: "736703876255",
  appId: "1:736703876255:web:f38c09fe4f0c4f22c766aa"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage()

export { auth }
export { db }
export { storage }