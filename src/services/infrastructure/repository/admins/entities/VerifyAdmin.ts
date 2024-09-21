import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type VerifyAdminPayload = {
  accessToken: string;
  refreshToken: string;
};

export default class VerifyAdmin {
  public accessToken: string;
  public refreshToken: string;

  constructor(payload: VerifyAdminPayload) {
    this._verifyPayload(payload);
    const { accessToken, refreshToken } = payload;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }

  _verifyPayload(payload: VerifyAdminPayload) {
    const { accessToken, refreshToken } = payload;
    // Check required fields
    if (!accessToken || !refreshToken) {
      throw new Error(DomainError["VERIFY_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY"]);
    }

    // Check fields data type
    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error(
        DomainError["VERIFY_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION"]
      );
    }
  }
}
