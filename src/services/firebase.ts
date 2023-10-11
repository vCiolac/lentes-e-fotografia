import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export { auth, database, storage };

// const firebaseConfig = {
//   apiKey: process.env.VITE_REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VITE_REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
// };