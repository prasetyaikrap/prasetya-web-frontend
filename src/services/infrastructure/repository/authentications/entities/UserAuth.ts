import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type UserAuthPayload = {
  accessToken: string;
  refreshToken: string;
};

export default class UserAuth {
  public accessToken: string;
  public refreshToken: string;

  constructor(payload: UserAuthPayload) {
    this._verifyPayload(payload);
    const { accessToken, refreshToken } = payload;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload(payload: UserAuthPayload) {
    const { accessToken, refreshToken } = payload;
    if (!accessToken || !refreshToken) {
      throw new Error(DomainError["USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY"]);
    }

    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error(
        DomainError["USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION"]
      );
    }
  }
}
