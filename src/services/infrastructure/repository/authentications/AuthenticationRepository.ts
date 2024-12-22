import { FieldValue, Firestore } from "firebase-admin/firestore";

import AuthenticationError from "@/services/commons/exceptions/AuthenticationError";
import { AuthenticationDocProps } from "@/services/commons/types/firestoreDoc";

export type AuthenticationRepositoryProps = {
  firestore: Firestore;
};
export default class AuthenticationRepository {
  public _firestore: Firestore;

  constructor({ firestore }: AuthenticationRepositoryProps) {
    this._firestore = firestore;
  }

  async addToken(userId: string, token: string) {
    const docId = `auth_${userId}`;
    const docRef = this._firestore.collection("authentications").doc(docId);
    await docRef.set(
      { userId, refresh_tokens: FieldValue.arrayUnion(token) },
      { merge: true }
    );

    return { id: docId };
  }

  async checkAvailabilityToken(userId: string, token: string) {
    const docId = `auth_${userId}`;
    const docRef = this._firestore.collection("authentications").doc(docId);
    const snapshot = await docRef.get();
    const data = snapshot.data() as AuthenticationDocProps;

    const isTokenAvailable = data.refresh_tokens?.includes(token);

    if (!isTokenAvailable) {
      throw new AuthenticationError("Token not found");
    }

    return {
      ...snapshot.data(),
      id: docId,
    };
  }

  async deleteToken(userId: string, token: string) {
    const docId = `auth_${userId}`;
    const docRef = this._firestore.collection("authentications").doc(docId);
    await docRef.update({ refresh_tokens: FieldValue.arrayRemove(token) });

    return {
      id: docId,
    };
  }
}
