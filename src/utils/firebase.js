// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5i-klnVI7YLYjfiCLrwaCqrRqp-pz6nI",
  authDomain: "netflixgpt-b13e9.firebaseapp.com",
  projectId: "netflixgpt-b13e9",
  storageBucket: "netflixgpt-b13e9.appspot.com",
  messagingSenderId: "395532949726",
  appId: "1:395532949726:web:46721acc8fb014999e0a4f",
  measurementId: "G-XJWHSYJK1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get Authentication
export const auth = getAuth();
