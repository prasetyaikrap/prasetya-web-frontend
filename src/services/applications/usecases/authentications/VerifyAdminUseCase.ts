import {
  AUTH_TOKENS,
  CLIENT_IDS_ENUM,
} from "@/services/commons/constants/general";
import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import VerifyAdmin from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type VerifyAdminUseCaseProps = {
  authTokenManager: AuthTokenManager;
};

export type VerifyAdminUseCasePayload = BaseUseCasePayload;
export default class VerifyAdminUseCase {
  public _authTokenManager: AuthTokenManager;

  constructor({ authTokenManager }: VerifyAdminUseCaseProps) {
    this._authTokenManager = authTokenManager;
  }

  async execute({ auth }: VerifyAdminUseCasePayload) {
    const { clientId } = new ClientIdentityAuth({
      clientId: auth?.clientId || "",
    });
    const { accessToken, refreshToken } = new VerifyAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });
    const { payload } =
      await this._authTokenManager.verifyAccessToken<AuthTokenPayload>(
        accessToken
      );

    return {
      accessToken,
      accessTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].accessTokenKey,
      refreshToken,
      refreshTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].refreshTokenKey,
      payload,
    };
  }
}
