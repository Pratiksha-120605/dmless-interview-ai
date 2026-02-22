// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuIkENPPPiiPpdGskfglm374RyMaHwALk",
  authDomain: "dmless-e19a8.firebaseapp.com",
  projectId: "dmless-e19a8",
  storageBucket: "dmless-e19a8.firebasestorage.app",
  messagingSenderId: "989931180000",
  appId: "1:989931180000:web:2fe95d983f1bae77e52585",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
