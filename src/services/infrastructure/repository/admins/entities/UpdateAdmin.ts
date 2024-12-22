import InvariantError from "@/services/commons/exceptions/InvariantError";
import { AdminDocProps } from "@/services/commons/types/firestoreDoc";

export type UpdateAdminPayload = {
  name: AdminDocProps["name"];
  email: AdminDocProps["email"];
  avatar: AdminDocProps["avatar"];
  permissions: AdminDocProps["permissions"];
};

export default class UpdateAdmin {
  public name: AdminDocProps["name"];
  public email: AdminDocProps["email"];
  public avatar: AdminDocProps["avatar"];

  constructor(payload: UpdateAdminPayload) {
    this._verifyPayload(payload);
    const { name, email, avatar } = payload;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }

  _verifyPayload(payload: UpdateAdminPayload) {
    const { name, email, avatar } = payload;

    // Check fields data type
    const dataTypeCheckFields = [name, email, avatar];
    if (dataTypeCheckFields.filter((f) => typeof f !== "string").length > 0) {
      throw new InvariantError(
        "Cannot register due to invalid payload property type"
      );
    }
  }
}
