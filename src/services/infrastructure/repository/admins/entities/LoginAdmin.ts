import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type LoginAdminPayload = {
  username: string;
  password: string;
  userAgent: string;
};

export default class LoginAdmin {
  public username: string;
  public password: string;
  public userAgent: string;

  constructor(payload: LoginAdminPayload) {
    this._verifyPayload(payload);
    const { username, password, userAgent } = payload;
    this.username = username;
    this.password = password;
    this.userAgent = userAgent;
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
