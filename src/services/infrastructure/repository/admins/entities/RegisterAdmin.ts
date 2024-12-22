import InvariantError from "@/services/commons/exceptions/InvariantError";
import { AdminDocProps } from "@/services/commons/types/firestoreDoc";

export type RegisterAdminPayload = {
  username: AdminDocProps["username"];
  password: string;
  name: AdminDocProps["name"];
  email: AdminDocProps["email"];
  avatar: AdminDocProps["avatar"];
  permissions: AdminDocProps["permissions"];
};

export default class RegisterAdmin {
  public username: AdminDocProps["username"];
  public password: string;
  public name: AdminDocProps["name"];
  public email: AdminDocProps["email"];
  public avatar: AdminDocProps["avatar"];

  constructor(payload: RegisterAdminPayload) {
    this._verifyPayload(payload);
    const { username, password, name, email, avatar } = payload;
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }

  _verifyPayload(payload: RegisterAdminPayload) {
    const { username, password, name, email, avatar } = payload;
    // Check required fields
    const requiredCheckFields = [username, password, name, email];
    if (requiredCheckFields.filter((f) => !f).length > 0) {
      throw new InvariantError(
        "Cannot register user due to invalid payload property"
      );
    }
    // Check fields data type
    const dataTypeCheckFields = [username, password, name, email, avatar];
    if (dataTypeCheckFields.filter((f) => typeof f !== "string").length > 0) {
      throw new InvariantError(
        "Cannot register due to invalid payload property type"
      );
    }
  }
}
