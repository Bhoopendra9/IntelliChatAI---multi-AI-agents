// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "intellichatai-ca7d1.firebaseapp.com",
  projectId: "intellichatai-ca7d1",
  storageBucket: "intellichatai-ca7d1.firebasestorage.app",
  messagingSenderId: "138579980791",
  appId: "1:138579980791:web:57496d3599a85bf4c83ef2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
