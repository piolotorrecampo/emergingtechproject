import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAbTpi0q88BJLyZTM-2x6ExNWqRv9Ts5dM",
  authDomain: "kaintipians.firebaseapp.com",
  projectId: "kaintipians",
  storageBucket: "kaintipians.appspot.com",
  messagingSenderId: "822216888589",
  appId: "1:822216888589:web:ae9253807c3b955c76a044",
  measurementId: "G-TKB0XT00XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);