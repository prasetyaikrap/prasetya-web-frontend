import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FAPIKEY,
  authDomain: process.env.FAUTHDOMAIN,
  projectId: process.env.FPROJECTID,
  storageBucket: process.env.FSTORAGEBUCKET,
  messagingSenderId: process.env.FMESSAGINGSENDERID,
  appId: process.env.FAPPID,
  measurementId: process.env.FMEASUREMENTID,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const timeStamp = Timestamp;
