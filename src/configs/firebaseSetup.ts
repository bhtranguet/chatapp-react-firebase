// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //Firebase SDK for initializing the app
import { getFirestore } from "firebase/firestore"; // Firebase SDK for Cloud Firestore
import { getAuth } from "firebase/auth"; // Firebase SDK for Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-elUvRCRUcb3-ynv1pyh1bvWNtXbBPtQ",
  authDomain: "fun-chat-1397.firebaseapp.com",
  projectId: "fun-chat-1397",
  storageBucket: "fun-chat-1397.appspot.com",
  messagingSenderId: "237791271982",
  appId: "1:237791271982:web:28514068c409abf85693bf",
  measurementId: "G-GEQGMF3BE5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initualize Firestore
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth(app);

export { db, auth };
