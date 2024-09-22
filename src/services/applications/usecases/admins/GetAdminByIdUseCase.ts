import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";

export type GetAdminByIdUseCaseProps = {
  adminRepository: AdminRepository;
};

export type GetAdminByIdUseCasePayload = {
  payload: {
    adminId: string;
  };
} & BaseUseCasePayload;

export default class GetAdminByIdUseCase {
  public _adminRepository: AdminRepository;
  constructor({ adminRepository }: GetAdminByIdUseCaseProps) {
    this._adminRepository = adminRepository;
  }

  async execute({ payload }: GetAdminByIdUseCasePayload) {
    const { adminId } = payload;
    return await this._adminRepository.getAdminById({ adminId });
  }
}
