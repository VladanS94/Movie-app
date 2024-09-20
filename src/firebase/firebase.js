import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9NnlDt5N8IlVdNhBrTJNwixmuaYERmMQ",
  authDomain: "movie-app-88bc8.firebaseapp.com",
  projectId: "movie-app-88bc8",
  storageBucket: "movie-app-88bc8.appspot.com",
  messagingSenderId: "555212401746",
  appId: "1:555212401746:web:c6c3a7bd14864fecb1c38b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
