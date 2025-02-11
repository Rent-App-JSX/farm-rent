// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_jX9iu6wYsSK6wFDjvvQ7DNA5CFBFDoo",
  authDomain: "rent-app-d50fb.firebaseapp.com",
  databaseURL: "https://rent-app-d50fb-default-rtdb.firebaseio.com",
  projectId: "rent-app-d50fb",
  storageBucket: "rent-app-d50fb.firebasestorage.app",
  messagingSenderId: "463787498729",
  appId: "1:463787498729:web:4e90d853455383b53ce478",
  measurementId: "G-DXBCXDVT7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);