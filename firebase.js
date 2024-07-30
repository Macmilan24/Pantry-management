// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8_Tm14YdUUx8P34o4ogCuHSejH5KeiM8",
  authDomain: "hspanteryapp.firebaseapp.com",
  projectId: "hspanteryapp",
  storageBucket: "hspanteryapp.appspot.com",
  messagingSenderId: "991939460579",
  appId: "1:991939460579:web:928afa582513b6613734d6",
  measurementId: "G-M207GT7LFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };
