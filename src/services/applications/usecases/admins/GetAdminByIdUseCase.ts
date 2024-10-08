import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import VerifyAdmin from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type GetAdminByIdUseCaseProps = {
  adminRepository: AdminRepository;
  authTokenManager: AuthTokenManager;
};

export type GetAdminByIdUseCasePayload = {
  adminId: string;
} & BaseUseCasePayload;

export default class GetAdminByIdUseCase {
  public _adminRepository: AdminRepository;
  public _authTokenManager: AuthTokenManager;

  constructor({ adminRepository, authTokenManager }: GetAdminByIdUseCaseProps) {
    this._adminRepository = adminRepository;
    this._authTokenManager = authTokenManager;
  }

  async execute({ adminId, auth }: GetAdminByIdUseCasePayload) {
    new ClientIdentityAuth({ clientId: auth?.clientId || "" });
    const { accessToken } = new VerifyAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });

    await this._authTokenManager.verifyAccessToken<AuthTokenPayload>(
      accessToken
    );
    return await this._adminRepository.getAdminById({ adminId });
  }
}
