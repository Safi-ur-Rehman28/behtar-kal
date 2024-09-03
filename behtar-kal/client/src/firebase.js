// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "behtarkal-ec201.firebaseapp.com",
  projectId: "behtarkal-ec201",
  storageBucket: "behtarkal-ec201.appspot.com",
  messagingSenderId: "108633439316",
  appId: "1:108633439316:web:cb82425f47cc00ec3c01c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
export const imageDb = getStorage(app);
