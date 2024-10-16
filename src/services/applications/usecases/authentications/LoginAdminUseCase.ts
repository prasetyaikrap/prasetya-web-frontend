import {
  AUTH_TOKENS,
  CLIENT_IDS_ENUM,
} from "@/services/commons/constants/general";
import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import LoginAdmin from "@/services/infrastructure/repository/admins/entities/LoginAdmin";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import AdminAuth from "@/services/infrastructure/repository/authentications/entities/AdminAuth";
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

  async execute({
    payload,
    credentials: { clientId, userAgent },
  }: LoginAdminUseCasePayload) {
    const { username: pUsername, password: pPassword } = new LoginAdmin({
      username: payload.username,
      password: payload.password,
    });

    const { id, username, hash_password } =
      await this._adminRepository.getAdminByUsername(pUsername);
    await this._passwordHash.comparePassword(pPassword, hash_password);

    const tokenPayload: AuthTokenPayload = {
      profile: {
        id,
        username,
      },
      userAgent: userAgent || null,
    };

    const accessToken = await this._authTokenManager.createAccessToken(
      tokenPayload,
      "1d"
    );
    const refreshToken = await this._authTokenManager.createRefreshToken(
      tokenPayload,
      "30d"
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      new AdminAuth({ accessToken, refreshToken });
    await this._authenticationRepository.addToken(id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      accessTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].accessTokenKey,
      refreshToken: newRefreshToken,
      refreshTokenKey: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].refreshTokenKey,
    };
  }
}
