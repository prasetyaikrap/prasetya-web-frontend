import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { AdminDocProps } from "@/services/commons/types/firestoreDoc";

export type AdminRepositoryProps = {
  firestore: Firestore;
};

export type AddAdminPayload = Omit<
  AdminDocProps,
  "id" | "createdAt" | "updatedAt"
>;

export default class AdminRepository {
  public _firestore: Firestore;
  public adminsCollectionRef: CollectionReference;

  constructor({ firestore }: AdminRepositoryProps) {
    this._firestore = firestore;
    this.adminsCollectionRef = this._firestore.collection("admins");
  }

  async getAdminByUsername(username: string): Promise<AdminDocProps> {
    const snapshot = await this.adminsCollectionRef
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

  async checkAvailablityAdmin(username: string, email: string) {
    const snapshot = await this.adminsCollectionRef
      .where(
        Filter.or(
          Filter.where("username", "in", username),
          Filter.where("email", "in", email)
        )
      )
      .get();

    if (!snapshot.empty) {
      throw new InvariantError("Cannot add new user. Admin is already exist");
    }
  }

  async addAdmin(payload: AddAdminPayload) {
    const res = await this.adminsCollectionRef.add({
      ...payload,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { id: res.id };
  }
}
