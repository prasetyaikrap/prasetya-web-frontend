import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type AdminLogoutPayload = {
  accessToken: string;
  refreshToken: string;
};

export default class LogoutAdmin {
  public refreshToken: string;

  constructor(payload: AdminLogoutPayload) {
    this._verifyPayload(payload);
    const { refreshToken } = payload;
    this.refreshToken = refreshToken;
  }

  _verifyPayload(payload: AdminLogoutPayload) {
    const { refreshToken } = payload;
    // Check required fields
    if (!refreshToken) {
      throw new Error(DomainError["LOGOUT_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY"]);
    }

    // Check fields data type
    if (typeof refreshToken !== "string") {
      throw new Error(
        DomainError["LOGOUT_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION"]
      );
    }
  }
}
