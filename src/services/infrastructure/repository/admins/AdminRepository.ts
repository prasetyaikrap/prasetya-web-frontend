import { Filter, Firestore } from "firebase-admin/firestore";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { AdminDocProps } from "@/services/commons/types/firestoreDoc";

export type AdminRepositoryProps = {
  firestore: Firestore;
};

export default class AdminRepository {
  public _firestore: Firestore;

  constructor({ firestore }: AdminRepositoryProps) {
    this._firestore = firestore;
  }

  async getAdminByUsername(username: string): Promise<AdminDocProps> {
    const queryRef = this._firestore.collection("admins");
    const snapshot = await queryRef
      .where(
        Filter.or(
          Filter.where("username", "==", username),
          Filter.where("email", "==", username)
        )
      )
      .get();
    if (snapshot.empty) {
      throw new InvariantError("Admin not found");
    }

    return {
      ...(snapshot.docs[0].data() as AdminDocProps),
      id: snapshot.docs[0].id,
    };
  }
}
