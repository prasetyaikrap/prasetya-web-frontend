import { AuthTokenPayload } from "@/services/commons/types/general";
import VerifyAdmin, {
  VerifyAdminPayload,
} from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type VerifyAdminUseCaseProps = {
  authTokenManager: AuthTokenManager;
};

export default class VerifyAdminUseCase {
  public _authTokenManager: AuthTokenManager;

  constructor({ authTokenManager }: VerifyAdminUseCaseProps) {
    this._authTokenManager = authTokenManager;
  }

  async execute(useCasePayload: VerifyAdminPayload) {
    const { accessToken, refreshToken } = new VerifyAdmin(useCasePayload);
    await this._authTokenManager.verifyAccessToken<AuthTokenPayload>(
      accessToken
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
