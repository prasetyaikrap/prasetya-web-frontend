import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import RegisterAdmin, {
  RegisterAdminPayload,
} from "@/services/infrastructure/repository/admins/entities/RegisterAdmin";
import VerifyAdmin from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";
import PasswordHash from "@/services/infrastructure/security/PasswordHash";

export type RegisterAdminUseCaseProps = {
  adminRepository: AdminRepository;
  authTokenManager: AuthTokenManager;
  passwordHash: PasswordHash;
};

export type RegisterAdminUseCasePayload = {
  payload: RegisterAdminPayload;
} & BaseUseCasePayload;

export default class RegisterAdminUseCase {
  public _adminRepository: AdminRepository;
  public _passwordHash: PasswordHash;
  public _authTokenManager: AuthTokenManager;

  constructor({
    adminRepository,
    passwordHash,
    authTokenManager,
  }: RegisterAdminUseCaseProps) {
    this._adminRepository = adminRepository;
    this._passwordHash = passwordHash;
    this._authTokenManager = authTokenManager;
  }

  async execute({ payload, auth }: RegisterAdminUseCasePayload) {
    new ClientIdentityAuth({ clientId: auth?.clientId || "" });
    const { accessToken } = new VerifyAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });
    await this._authTokenManager.verifyAccessToken<AuthTokenPayload>(
      accessToken
    );

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
