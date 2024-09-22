import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import { UpdateAdminPayload } from "@/services/infrastructure/repository/admins/entities/UpdateAdmin";
import VerifyAdmin from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type UpdateAdminByIdUseCaseProps = {
  adminRepository: AdminRepository;
  authTokenManager: AuthTokenManager;
};

export type UpdateAdminByIdUseCasePayload = {
  adminId: string;
  payload: UpdateAdminPayload;
} & BaseUseCasePayload;

export default class UpdateAdminByIdUseCase {
  public _adminRepository: AdminRepository;
  public _authTokenManager: AuthTokenManager;
  constructor({
    adminRepository,
    authTokenManager,
  }: UpdateAdminByIdUseCaseProps) {
    this._adminRepository = adminRepository;
    this._authTokenManager = authTokenManager;
  }

  async execute({ adminId, payload, auth }: UpdateAdminByIdUseCasePayload) {
    new ClientIdentityAuth({ clientId: auth?.clientId || "" });
    const { accessToken } = new VerifyAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });

    await this._authTokenManager.verifyAccessToken<AuthTokenPayload>(
      accessToken
    );

    return await this._adminRepository.updateAdminById({ adminId, payload });
  }
}
