import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import RegisterAdmin, {
  RegisterAdminPayload,
} from "@/services/infrastructure/repository/admins/entities/RegisterAdmin";
import PasswordHash from "@/services/infrastructure/security/PasswordHash";

export type RegisterAdminUseCaseProps = {
  adminRepository: AdminRepository;
  passwordHash: PasswordHash;
};

export type RegisterAdminUseCasePayload = {
  payload: RegisterAdminPayload;
} & BaseUseCasePayload;

export default class RegisterAdminUseCase {
  public _adminRepository: AdminRepository;
  public _passwordHash: PasswordHash;

  constructor({ adminRepository, passwordHash }: RegisterAdminUseCaseProps) {
    this._adminRepository = adminRepository;
    this._passwordHash = passwordHash;
  }

  async execute({ payload }: RegisterAdminUseCasePayload) {
    const { username, password, name, email, avatar, permissions } =
      new RegisterAdmin(payload);
    await this._adminRepository.checkAvailablityAdmin(username, email);
    const hashPassword = await this._passwordHash.hash(password);

    return this._adminRepository.addAdmin({
      username,
      hash_password: hashPassword,
      name,
      email,
      avatar,
      permissions,
    });
  }
}
