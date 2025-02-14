import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB_jX9iu6wYsSK6wFDjvvQ7DNA5CFBFDoo",
  authDomain: "rent-app-d50fb.firebaseapp.com",
  databaseURL: "https://rent-app-d50fb-default-rtdb.firebaseio.com", // Change to Realtime Database URL
  projectId: "rent-app-d50fb",
  storageBucket: "rent-app-d50fb.firebasestorage.app",
  messagingSenderId: "463787498729",
  appId: "1:463787498729:web:4e90d853455383b53ce478",
  measurementId: "G-DXBCXDVT7E",
};

const app = initializeApp(firebaseConfig);

// Get Realtime Database and Auth instances
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
