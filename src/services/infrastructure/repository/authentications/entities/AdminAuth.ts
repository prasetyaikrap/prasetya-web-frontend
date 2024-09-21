import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type AdminAuthPayload = {
  accessToken?: string;
  refreshToken?: string;
};

export default class AdminAuth {
  public accessToken: string;
  public refreshToken: string;

  constructor(payload: AdminAuthPayload) {
    this._verifyPayload(payload);
    const { accessToken, refreshToken } = payload;
    this.accessToken = accessToken || "";
    this.refreshToken = refreshToken || "";
  }

  _verifyPayload(payload: AdminAuthPayload) {
    const { accessToken, refreshToken } = payload;
    if (!accessToken || !refreshToken) {
      throw new Error(DomainError["ADMIN_AUTH.NOT_CONTAIN_NEEDED_PROPERTY"]);
    }

    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error(
        DomainError["ADMIN_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION"]
      );
    }
  }
}
