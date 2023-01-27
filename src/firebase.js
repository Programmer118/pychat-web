// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
    apiKey: "AIzaSyAP5vGAXKcY7B2Qa0zBL3Bxx8Iy-zOnUHk",
    authDomain: "chat-65244.firebaseapp.com",
    projectId: "chat-65244",
    storageBucket: "chat-65244.appspot.com",
    messagingSenderId: "263361177031",
    appId: "1:263361177031:web:4e897ff76923b310a1a5e2",
    measurementId: "G-127KX9771R"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()