import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import LoginAdmin from "@/services/infrastructure/repository/admins/entities/LoginAdmin";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import AdminAuth from "@/services/infrastructure/repository/authentications/entities/AdminAuth";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";
import PasswordHash from "@/services/infrastructure/security/PasswordHash";

export type LoginAdminUseCaseProps = {
  adminRepository: AdminRepository;
  authenticationRepository: AuthenticationRepository;
  authTokenManager: AuthTokenManager;
  passwordHash: PasswordHash;
};

export type LoginAdminUseCasePayload = {
  payload: {
    username: string;
    password: string;
  };
} & BaseUseCasePayload;

export default class LoginAdminUseCase {
  public _adminRepository: AdminRepository;
  public _authenticationRepository: AuthenticationRepository;
  public _authTokenManager: AuthTokenManager;
  public _passwordHash: PasswordHash;

  constructor({
    adminRepository,
    authenticationRepository,
    authTokenManager,
    passwordHash,
  }: LoginAdminUseCaseProps) {
    this._adminRepository = adminRepository;
    this._authenticationRepository = authenticationRepository;
    this._authTokenManager = authTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute({ payload, auth }: LoginAdminUseCasePayload) {
    new ClientIdentityAuth({ clientId: auth?.clientId || "" });

    const {
      username: pUsername,
      password: pPassword,
      userAgent,
    } = new LoginAdmin({
      username: payload.username,
      password: payload.password,
      userAgent: auth?.userAgent || "",
    });

    const { id, username, hashPassword } =
      await this._adminRepository.getAdminByUsername(pUsername);
    await this._passwordHash.comparePassword(pPassword, hashPassword);

    const tokenPayload: AuthTokenPayload = {
      profile: {
        id,
        username,
      },
      userAgent,
    };

    const accessToken = await this._authTokenManager.createAccessToken(
      tokenPayload,
      "6h"
    );
    const refreshToken = await this._authTokenManager.createRefreshToken(
      tokenPayload,
      "30d"
    );

    const newAuthentication = new AdminAuth({ accessToken, refreshToken });
    await this._authenticationRepository.addToken(
      id,
      newAuthentication.refreshToken
    );

    return newAuthentication;
  }
}
