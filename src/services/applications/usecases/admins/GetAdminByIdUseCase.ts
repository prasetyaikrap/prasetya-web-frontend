import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
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

  async execute({ adminId }: GetAdminByIdUseCasePayload) {
    return await this._adminRepository.getAdminById({ adminId });
  }
}
