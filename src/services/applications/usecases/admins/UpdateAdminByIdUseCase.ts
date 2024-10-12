import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import { UpdateAdminPayload } from "@/services/infrastructure/repository/admins/entities/UpdateAdmin";
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

  async execute({ adminId, payload }: UpdateAdminByIdUseCasePayload) {
    return await this._adminRepository.updateAdminById({ adminId, payload });
  }
}
