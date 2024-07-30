// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-10b9d.firebaseapp.com",
  projectId: "reactchat-10b9d",
  storageBucket: "reactchat-10b9d.appspot.com",
  messagingSenderId: "436753393827",
  appId: "1:436753393827:web:a8790fa0f6d2718dcf3716"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };




