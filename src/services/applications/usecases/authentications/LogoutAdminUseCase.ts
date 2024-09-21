import { AuthTokenPayload } from "@/services/commons/types/general";
import LogoutAdmin, {
  AdminLogoutPayload,
} from "@/services/infrastructure/repository/admins/entities/LogoutAdmin";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type LogoutAdminUseCaseProps = {
  authenticationRepository: AuthenticationRepository;
  authTokenManager: AuthTokenManager;
};

export default class LoginAdminUseCase {
  public _authenticationRepository: AuthenticationRepository;
  public _authTokenManager: AuthTokenManager;

  constructor({
    authenticationRepository,
    authTokenManager,
  }: LogoutAdminUseCaseProps) {
    this._authenticationRepository = authenticationRepository;
    this._authTokenManager = authTokenManager;
  }

  async execute(useCasePayload: AdminLogoutPayload) {
    const { refreshToken } = new LogoutAdmin(useCasePayload);
    const {
      payload: {
        profile: { id: userId },
      },
    } =
      await this._authTokenManager.verifyRefreshToken<AuthTokenPayload>(
        refreshToken
      );

    await this._authenticationRepository.deleteToken(userId, refreshToken);
  }
}
