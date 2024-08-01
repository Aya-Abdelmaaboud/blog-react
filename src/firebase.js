// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuoXlYh_Xkj77XNn-HNDW_-Bc7uEzVU6w",
  authDomain: "blog-project-d011a.firebaseapp.com",
  projectId: "blog-project-d011a",
  storageBucket: "blog-project-d011a.appspot.com",
  messagingSenderId: "1004286673130",
  appId: "1:1004286673130:web:7f35e5d306658d11e39793",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
