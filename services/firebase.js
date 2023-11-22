// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjZ0pQ2iESteIcY9tx1Es1eMplP2Qyd2g",
  authDomain: "emtechproject-39059.firebaseapp.com",
  projectId: "emtechproject-39059",
  storageBucket: "emtechproject-39059.appspot.com",
  messagingSenderId: "225389966080",
  appId: "1:225389966080:web:72ddd0572e072695f4f9e5",
  measurementId: "G-QVPPSG1V5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);

