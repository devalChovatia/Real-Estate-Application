// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-70db2.firebaseapp.com",
  projectId: "real-estate-70db2",
  storageBucket: "real-estate-70db2.appspot.com",
  messagingSenderId: "261525807030",
  appId: "1:261525807030:web:c6c79c331cbb071cdb6b17",
  measurementId: "G-F05YD2JBR3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);