import {
  AUTH_TOKENS,
  CLIENT_IDS_ENUM,
} from "@/services/commons/constants/general";
import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import LogoutAdmin from "@/services/infrastructure/repository/admins/entities/LogoutAdmin";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type LogoutAdminUseCaseProps = {
  authenticationRepository: AuthenticationRepository;
  authTokenManager: AuthTokenManager;
};

export type LogoutAdminUseCasePayload = BaseUseCasePayload;

export default class LogoutAdminUseCase {
  public _authenticationRepository: AuthenticationRepository;
  public _authTokenManager: AuthTokenManager;

  constructor({
    authenticationRepository,
    authTokenManager,
  }: LogoutAdminUseCaseProps) {
    this._authenticationRepository = authenticationRepository;
    this._authTokenManager = authTokenManager;
  }

  async execute({ auth }: LogoutAdminUseCasePayload) {
    const { clientId } = new ClientIdentityAuth({
      clientId: auth?.clientId || "",
    });

    const { refreshToken } = new LogoutAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });

    const {
      payload: {
        profile: { id: userId },
      },
    } =
      await this._authTokenManager.verifyRefreshToken<AuthTokenPayload>(
        refreshToken
      );

    await this._authenticationRepository.deleteToken(userId, refreshToken);

    return {
      accessTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].accessTokenKey,
      refreshTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].refreshTokenKey,
    };
  }
}
