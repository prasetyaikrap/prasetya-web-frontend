"use server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { ENV } from "@/configs";

export default async function firebaseInitialize() {
  const firebaseServiceAccount = JSON.parse(ENV.FIREBASE_SERVICE_ACCOUNT);
  if (getApps().length <= 0) {
    initializeApp({
      credential: cert(firebaseServiceAccount),
      databaseURL: ENV.FIREBASE_DATABASE_URL,
    });
  }

  return {
    firestoreDB: getFirestore(),
  };
}
