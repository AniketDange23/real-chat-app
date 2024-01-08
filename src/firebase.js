// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXv_B7fC1DNjjuIDkKf6TVjGq3GGssG4A",
  authDomain: "real-chat-apps-24.firebaseapp.com",
  projectId: "real-chat-apps-24",
  storageBucket: "real-chat-apps-24.appspot.com",
  messagingSenderId: "639708644696",
  appId: "1:639708644696:web:c7025ba11792507c60112d",
  measurementId: "G-Q1CM09P3ND",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
