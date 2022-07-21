import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "../../firebaseServiceAccount.json" assert { type: "json" };

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://prasetya-mainweb-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
