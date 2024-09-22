import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { AdminDocProps } from "@/services/commons/types/firestoreDoc";
import { QueryFilter } from "@/services/commons/types/query";
import { generateFirestoreQueries } from "@/services/commons/utils/query";

export type AdminRepositoryProps = {
  firestore: Firestore;
};

export type AddAdminPayload = Omit<
  AdminDocProps,
  "id" | "created_at" | "updated_at"
>;

export type GetAdminsPayload = {
  filters: QueryFilter[];
  orders: string[];
  limit: number;
  offset: number;
};

export default class AdminRepository {
  public _firestore: Firestore;
  public adminsCollectionRef: CollectionReference;
  public metadataCollectionRef: CollectionReference;

  constructor({ firestore }: AdminRepositoryProps) {
    this._firestore = firestore;
    this.adminsCollectionRef = this._firestore.collection("admins");
    this.metadataCollectionRef = this._firestore.collection("metadata");
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
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    });

    await this.metadataCollectionRef
      .doc("total_rows")
      .update({ admins: FieldValue.increment(1) });

    return { id: res.id };
  }

  async getAdmins({ filters, orders, limit, offset }: GetAdminsPayload) {
    const queries = generateFirestoreQueries({
      queryRef: this.adminsCollectionRef,
      filters,
      orders,
      limit,
      offset,
    });
    const snapshot = await queries.get();

    const adminsData = snapshot.docs.map((doc) => {
      const d = doc.data() as AdminDocProps;
      return {
        id: doc.id,
        username: d.username,
        name: d.name,
        email: d.email,
        avatar: d.avatar,
        permissions: d.permissions,
        createdAt: d.created_at,
        updatedAt: d.updated_at,
      };
    });

    const totalRowsMetadata = await this.metadataCollectionRef
      .doc("total_rows")
      .get();

    const totalRows = totalRowsMetadata.data()?.admins || 0;
    const totalPages = Math.ceil(totalRows / limit);
    const currentPage = offset / limit + 1;

    return {
      data: adminsData,
      metadata: {
        total_rows: totalRows,
        current_page: currentPage,
        total_page: totalPages,
        per_page: limit,
      },
    };
  }
}
