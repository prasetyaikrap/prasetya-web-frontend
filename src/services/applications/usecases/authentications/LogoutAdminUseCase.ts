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
    this.onVerifyRefreshTokenFailed =
      this.onVerifyRefreshTokenFailed.bind(this);
  }

  async execute({
    credentials: {
      accessToken: clientAccessToken,
      refreshToken: clientRefreshToken,
      clientId,
    },
  }: LogoutAdminUseCasePayload) {
    const { refreshToken } = new LogoutAdmin({
      accessToken: clientAccessToken,
      refreshToken: clientRefreshToken,
    });

    const {
      payload: {
        profile: { id: userId },
      },
    } = await this._authTokenManager.verifyRefreshToken<AuthTokenPayload>(
      refreshToken,
      this.onVerifyRefreshTokenFailed
    );

    await this._authenticationRepository.deleteToken(userId, refreshToken);

    return {
      accessTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].accessTokenKey,
      refreshTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].refreshTokenKey,
    };
  }

  async onVerifyRefreshTokenFailed(token: string) {
    const res = this._authTokenManager.decodeToken<AuthTokenPayload>(token);
    await this._authenticationRepository.deleteToken(
      res?.profile.id || "",
      token
    );
  }
}
