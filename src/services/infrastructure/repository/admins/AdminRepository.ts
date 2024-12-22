import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import NotFoundError from "@/services/commons/exceptions/NotFoundError";
import { AdminDocProps } from "@/services/commons/types/firestoreDoc";
import { QueryFilter } from "@/services/commons/types/query";
import {
  generateFirestoreQueries,
  getPaginationMetadata,
} from "@/services/commons/utils/query";

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
  page: number;
  cursor: string;
};

export type GetAdminByIdPayload = {
  adminId: string;
};

export type UpdateAdminByIdPayload = {
  adminId: string;
  payload: Omit<
    AdminDocProps,
    "id" | "username" | "hash_password" | "created_at" | "updated_at"
  >;
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
      throw new NotFoundError("Admin not found");
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
          Filter.where("username", "==", username),
          Filter.where("email", "==", email)
        )
      )
      .get();

    if (!snapshot.empty) {
      throw new InvariantError("Cannot add new user. Admin is already exist");
    }
  }

  async addAdmin(payload: AddAdminPayload) {
    const adminDoc = this.adminsCollectionRef.doc();
    const totalRowsDoc = this.metadataCollectionRef.doc("total_rows");

    await this._firestore.runTransaction(async (t) => {
      t.set(adminDoc, {
        ...payload,
        is_verified: false,
        permissions: [],
        created_at: FieldValue.serverTimestamp(),
        updated_at: FieldValue.serverTimestamp(),
      });

      t.update(totalRowsDoc, {
        admins: FieldValue.increment(1),
      });
    });

    return { id: adminDoc.id };
  }

  async getAdmins({ filters, orders, limit, page, cursor }: GetAdminsPayload) {
    const queries = generateFirestoreQueries({
      queryRef: this.adminsCollectionRef,
      filters,
      orders,
      limit,
      cursor,
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
        is_verified: d.is_verified,
        permissions: d.permissions,
        created_at: d.created_at,
        updated_at: d.updated_at,
      };
    });

    const lastData = snapshot.docs[snapshot.docs.length - 1];
    const { currentPage, totalRows, totalPages, previousCursor, nextCursor } =
      await getPaginationMetadata({
        queryRef: this.metadataCollectionRef,
        totalRowsKey: "admins",
        limit,
        page,
        currentCursor: cursor || "",
        nextCursor: lastData.id,
      });

    return {
      data: adminsData,
      metadata: {
        total_rows: totalRows,
        current_page: currentPage,
        total_page: totalPages,
        per_page: limit,
        previousCursor,
        nextCursor,
      },
    };
  }

  async getAdminById({ adminId }: GetAdminByIdPayload) {
    const snapshot = await this.adminsCollectionRef.doc(adminId).get();

    if (!snapshot.exists) {
      throw new NotFoundError("Admin Not Found");
    }

    const adminData = snapshot.data() as AdminDocProps;

    return {
      ...adminData,
      id: snapshot.id,
    };
  }

  async updateAdminById({ adminId, payload }: UpdateAdminByIdPayload) {
    const snapshot = await this.adminsCollectionRef
      .doc(adminId)
      .update({ ...payload, updated_at: FieldValue.serverTimestamp() });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to update admin profile");
    }
  }
}
