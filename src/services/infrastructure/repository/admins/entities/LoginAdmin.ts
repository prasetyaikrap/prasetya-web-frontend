import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type LoginAdminPayload = {
  username: string;
  password: string;
};

export default class LoginAdmin {
  public username: string;
  public password: string;

  constructor(payload: LoginAdminPayload) {
    this._verifyPayload(payload);
    const { username, password } = payload;
    this.username = username;
    this.password = password;
  }

  _verifyPayload(payload: LoginAdminPayload) {
    const { username, password } = payload;
    // Check required fields
    if (!username || !password) {
      throw new Error(DomainError["LOGIN_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY"]);
    }

    // Check fields data type
    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error(
        DomainError["LOGIN_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION"]
      );
    }
  }
}
