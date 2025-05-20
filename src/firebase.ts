// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2l3YOX1BjQi_kP3dcSFRoEknvvJVD09k",
  authDomain: "grievanceportal-70161.firebaseapp.com",
  projectId: "grievanceportal-70161",
  storageBucket: "grievanceportal-70161.firebasestorage.app",
  messagingSenderId: "299778851590",
  appId: "1:299778851590:web:0a3ffbc12ed723993d5487",
  measurementId: "G-WN6P5GTFLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
