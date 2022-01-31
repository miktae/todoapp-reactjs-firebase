// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTZ_L9WQQ-P9alTAHJ12qnsOvfE4ce1uA",
  authDomain: "todoapp-9b452.firebaseapp.com",
  databaseURL: "https://todoapp-9b452-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todoapp-9b452",
  storageBucket: "todoapp-9b452.appspot.com",
  messagingSenderId: "275036196887",
  appId: "1:275036196887:web:f43006e01c754264e3cc52",
  measurementId: "G-N7H32J6QY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);