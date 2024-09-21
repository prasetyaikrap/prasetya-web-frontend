import { FieldValue, Firestore } from "firebase-admin/firestore";

import { AuthenticationDocProps } from "@/services/commons/types/firestoreDoc";
import AuthorizationError from "@/services/commons/exceptions/AuthorizationError";

export type AuthenticationRepositoryProps = {
  firestore: Firestore;
};
export default class AuthenticationRepository {
  public _firestore: Firestore;

  constructor({ firestore }: AuthenticationRepositoryProps) {
    this._firestore = firestore;
  }

  async addToken(userId: string, token: string) {
    const docId = `rt_${userId}`;
    const docRef = this._firestore.collection("authentications").doc(docId);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      await docRef.set({ userId, refreshTokens: FieldValue.arrayUnion(token) });
    } else {
      await docRef.update({ refreshTokens: FieldValue.arrayUnion(token) });
    }

    return { id: docId };
  }

  async checkAvailabilityToken(userId: string, token: string) {
    const docId = `rt_${userId}`;
    const docRef = this._firestore.collection("authentications").doc(docId);
    const snapshot = await docRef.get();
    const data = snapshot.data() as AuthenticationDocProps | undefined;

    const isTokenAvailable = data?.refreshTokens?.includes(token);

    if (!isTokenAvailable) {
      throw new AuthorizationError("Token not found");
    }

    return {
      ...snapshot.data(),
      id: docId,
    };
  }

  async deleteToken(userId: string, token: string) {
    const docId = `rt_${userId}`;
    const docRef = this._firestore.collection("authentications").doc(docId);
    await docRef.update({ refreshTokens: FieldValue.arrayRemove(token) });

    return {
      id: docId,
    };
  }
}
