import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FAPIKEY,
  authDomain: process.env.NEXT_PUBLIC_FAUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FPROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FSTORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FMESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FAPPID,
  measurementId: process.env.NEXT_PUBLIC_FMEASUREMENTID,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
