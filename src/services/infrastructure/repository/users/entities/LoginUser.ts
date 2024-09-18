import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

type UserPayload = {
  username: string;
  password: string;
};

export default class LoginUser {
  public username: string;
  public password: string;

  constructor(payload: UserPayload) {
    this._verifyPayload(payload);
    const { username, password } = payload;
    this.username = username;
    this.password = password;
  }

  _verifyPayload(payload: UserPayload) {
    const { username, password } = payload;
    // Check required fields
    if (!username || !password) {
      throw new Error(DomainError["LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY"]);
    }

    // Check fields data type
    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error(
        DomainError["LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"]
      );
    }
  }
}
