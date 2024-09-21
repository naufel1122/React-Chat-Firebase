import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-34f7f.firebaseapp.com",
  projectId: "react-chat-34f7f",
  storageBucket: "react-chat-34f7f.appspot.com",
  messagingSenderId: "808598454260",
  appId: "1:808598454260:web:735ab3867176b2331543a1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth };
export { db };
export { storage };


