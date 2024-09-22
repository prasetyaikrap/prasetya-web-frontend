import AuthenticationError from "@/services/commons/exceptions/AuthenticationError";

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
      throw new AuthenticationError("Unauthenticated. Auth tokens is required");
    }

    // Check fields data type
    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new AuthenticationError(
        "Unauthenticated. Invalid type of auth tokens"
      );
    }
  }
}
