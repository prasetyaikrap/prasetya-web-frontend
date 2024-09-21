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

export type RefreshAdminUseCasePayload = {} & BaseUseCasePayload;

export default class RefreshAdminUseCase {
  public _authTokenManager: AuthTokenManager;
  public _authenticationRepository: AuthenticationRepository;

  constructor({
    authTokenManager,
    authenticationRepository,
  }: RefreshAdminUseCaseProps) {
    this._authTokenManager = authTokenManager;
    this._authenticationRepository = authenticationRepository;
  }

  async execute({ auth }: RefreshAdminUseCasePayload) {
    new ClientIdentityAuth({ clientId: auth?.clientId || "" });

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
      refreshToken,
    };
  }

  async onVerifyRefreshTokenFailed(token: string) {
    const {
      profile: { id: userId },
    } = this._authTokenManager.decodeToken<AuthTokenPayload>(token);
    await this._authenticationRepository.deleteToken(userId, token);
  }
}
