import {
  AUTH_TOKENS,
  CLIENT_IDS_ENUM,
} from "@/services/commons/constants/general";
import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import VerifyAdmin from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type RefreshAdminUseCaseProps = {
  authTokenManager: AuthTokenManager;
  authenticationRepository: AuthenticationRepository;
};

export type RefreshAdminUseCasePayload = BaseUseCasePayload;

export default class RefreshAdminUseCase {
  public _authTokenManager: AuthTokenManager;
  public _authenticationRepository: AuthenticationRepository;

  constructor({
    authTokenManager,
    authenticationRepository,
  }: RefreshAdminUseCaseProps) {
    this._authTokenManager = authTokenManager;
    this._authenticationRepository = authenticationRepository;

    this.onVerifyRefreshTokenFailed =
      this.onVerifyRefreshTokenFailed.bind(this);
  }

  async execute({ auth }: RefreshAdminUseCasePayload) {
    const { clientId } = new ClientIdentityAuth({
      clientId: auth?.clientId || "",
    });

    const { refreshToken } = new VerifyAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });
    const { payload } =
      await this._authTokenManager.verifyRefreshToken<AuthTokenPayload>(
        refreshToken,
        this.onVerifyRefreshTokenFailed
      );
    await this._authenticationRepository.checkAvailabilityToken(
      payload.profile.id,
      refreshToken
    );

    const newAccessToken =
      await this._authTokenManager.createAccessToken(payload);

    return {
      accessToken: newAccessToken,
      accessTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].accessTokenKey,
      refreshToken,
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
