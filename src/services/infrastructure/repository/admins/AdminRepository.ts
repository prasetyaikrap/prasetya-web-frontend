import { AxiosInstance } from "axios";
import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";

import { ENV } from "@/configs";
import InvariantError from "@/services/commons/exceptions/InvariantError";
import NotFoundError from "@/services/commons/exceptions/NotFoundError";
import {
  AdminDocProps,
  AuthenticationDocProps,
} from "@/services/commons/types/firestoreDoc";
import { QueryFilter } from "@/services/commons/types/query";
import { convertTimestampToDateString } from "@/services/commons/utils/general";
import {
  generateFirestoreQueries,
  getPaginationMetadata,
} from "@/services/commons/utils/query";

export type AdminRepositoryProps = {
  firestore: Firestore;
  axiosInstance: AxiosInstance;
};

export type AddAdminPayload = Omit<
  AdminDocProps,
  "id" | "created_at" | "updated_at"
>;

export type GetAdminsPayload = {
  filters: QueryFilter[];
  orders: string[];
  limit: number;
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

export type AdminRequestResetPasswordProps = {
  adminId: string;
  username: string;
  email: string;
};

export type AdminVerifyAuthenticationTokenProps = {
  adminId: string;
  token: string;
  key: string;
};

export type AdminRequestVerifyAccountProps = {
  adminId: string;
  username: string;
  email: string;
};

export type PostGASResponse = {
  success: boolean;
  code: number;
  message: string;
};

export type ChangePasswordProps = {
  adminId: string;
  password: string;
};

export type VerifyAdminAccountProps = {
  adminId: string;
};

type AuthenticationToken = Pick<
  AuthenticationDocProps,
  "verify_admin" | "verify_reset_password"
>;

export default class AdminRepository {
  public _firestore: Firestore;
  public adminsCollectionRef: CollectionReference;
  public metadataCollectionRef: CollectionReference;
  public _authenticationCollectionRef: CollectionReference;
  public _axiosInstance: AxiosInstance;

  constructor({ firestore, axiosInstance }: AdminRepositoryProps) {
    this._axiosInstance = axiosInstance;
    this._firestore = firestore;
    this.adminsCollectionRef = this._firestore.collection("admins");
    this.metadataCollectionRef = this._firestore.collection("metadata");
    this._authenticationCollectionRef =
      this._firestore.collection("authentications");
  }

  async getAdminByUsername(username: string) {
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
    const adminData = snapshot.docs[0].data() as AdminDocProps;

    return {
      ...adminData,
      id: snapshot.docs[0].id,
      created_at: convertTimestampToDateString(adminData.created_at),
      updated_at: convertTimestampToDateString(adminData.updated_at),
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
    const authenticationDoc = this._authenticationCollectionRef.doc(
      `auth_${adminDoc.id}`
    );

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

      t.set(authenticationDoc, {
        user_id: adminDoc.id,
        refresh_tokens: [],
        verify_reset_password: null,
        verify_admin: null,
      });
    });

    return { id: adminDoc.id };
  }

  async getAdmins({ filters, orders, limit, cursor }: GetAdminsPayload) {
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
        ...d,
        id: doc.id,
        created_at: convertTimestampToDateString(d.created_at),
        updated_at: convertTimestampToDateString(d.updated_at),
      };
    });

    const lastData = snapshot.docs[snapshot.docs.length - 1];
    const metadata = await getPaginationMetadata({
      queryRef: this.metadataCollectionRef,
      totalRowsKey: "admins",
      limit,
      currentCursor: cursor || "",
      nextCursor: lastData.id,
    });

    return {
      data: adminsData,
      metadata,
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
      created_at: convertTimestampToDateString(adminData.created_at),
      updated_at: convertTimestampToDateString(adminData.updated_at),
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

  async adminRequestResetPassword({
    adminId,
    username,
    email,
  }: AdminRequestResetPasswordProps) {
    const verifyResetPasswordToken = crypto.randomUUID();
    const docId = `auth_${adminId}`;

    const snapshot = await this._authenticationCollectionRef.doc(docId).set(
      {
        userId: adminId,
        verify_reset_password: {
          token: verifyResetPasswordToken,
          created_at: FieldValue.serverTimestamp(),
        },
      },
      { merge: true }
    );

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to store verifyToken");
    }
    const requestLink = `${ENV.APP_HOST}/admin/reset/${adminId}?verify_token=${verifyResetPasswordToken}`;
    const targetPost = `${ENV.GOOGLE_APP_SCRIPT_WEBAPP_URL}?action=reset-password&token=${ENV.GOOGLE_APP_SCRIPT_SECRET}`;

    const {
      data: { success },
    } = await this._axiosInstance.post<PostGASResponse>(targetPost, {
      username,
      email,
      request_link: requestLink,
      app_id: ENV.APP_ID,
    });

    if (!success) {
      throw new InvariantError("Failed to send reset password email");
    }
  }

  async adminRequestVerifyAccount({
    adminId,
    username,
    email,
  }: AdminRequestVerifyAccountProps) {
    const verifyAdminToken = crypto.randomUUID();
    const docId = `auth_${adminId}`;

    const snapshot = await this._authenticationCollectionRef.doc(docId).set(
      {
        userId: adminId,
        verify_admin: {
          token: verifyAdminToken,
          created_at: FieldValue.serverTimestamp(),
        },
      },
      { merge: true }
    );

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to store verifyToken");
    }
    const requestLink = `${ENV.APP_HOST}/admin/verify/${adminId}?verify_token=${verifyAdminToken}`;
    const targetPost = `${ENV.GOOGLE_APP_SCRIPT_WEBAPP_URL}?action=verify-admin&token=${ENV.GOOGLE_APP_SCRIPT_SECRET}`;

    const {
      data: { success },
    } = await this._axiosInstance.post<PostGASResponse>(targetPost, {
      username,
      email,
      request_link: requestLink,
      app_id: ENV.APP_ID,
    });

    if (!success) {
      throw new InvariantError("Failed to send verify admin email");
    }
  }

  async verifyAuthenticationToken({
    adminId,
    token,
    key,
  }: AdminVerifyAuthenticationTokenProps) {
    const docId = `auth_${adminId}`;
    const snapshot = await this._authenticationCollectionRef.doc(docId).get();
    if (!snapshot.exists) {
      throw new NotFoundError("User Admin Not Found");
    }

    const authenticationsData = snapshot.data() as AuthenticationDocProps;
    const recordToken =
      authenticationsData[key as keyof AuthenticationToken]?.token;

    if (token !== recordToken) {
      throw new InvariantError(`Invalid token: ${key}`);
    }
  }

  async changePassword({ adminId, password }: ChangePasswordProps) {
    const snapshot = await this.adminsCollectionRef
      .doc(adminId)
      .update({ hash_password: password });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to update password");
    }

    return { id: adminId };
  }

  async verifyAdminAccount({ adminId }: VerifyAdminAccountProps) {
    const snapshot = await this.adminsCollectionRef
      .doc(adminId)
      .update({ is_verified: true });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to verify admin account");
    }

    return { id: adminId };
  }
}
