import LoginAdminUseCase, {
  LoginAdminUseCasePayload,
} from "@/services/applications/usecases/authentications/LoginAdminUseCase";
import LogoutAdminUseCase, {
  LogoutAdminUseCasePayload,
} from "@/services/applications/usecases/authentications/LogoutAdminUseCase";
import RefreshAdminUseCase, {
  RefreshAdminUseCasePayload,
} from "@/services/applications/usecases/authentications/RefreshAdminUseCase";
import VerifyAdminUseCase, {
  VerifyAdminUseCasePayload,
} from "@/services/applications/usecases/authentications/VerifyAdminUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";

export type AuthenticationsHandlerProps = {
  loginAdminUseCase: LoginAdminUseCase;
  verifyAdminUseCase: VerifyAdminUseCase;
  refreshAdminUseCase: RefreshAdminUseCase;
  logoutAdminUseCase: LogoutAdminUseCase;
};

export default class AuthenticationsHandler {
  public _loginAdminUseCase: LoginAdminUseCase;
  public _verifyAdminUseCase: VerifyAdminUseCase;
  public _refreshAdminUseCase: RefreshAdminUseCase;
  public _logoutAdminUseCase: LogoutAdminUseCase;
  constructor({
    loginAdminUseCase,
    verifyAdminUseCase,
    refreshAdminUseCase,
    logoutAdminUseCase,
  }: AuthenticationsHandlerProps) {
    this._loginAdminUseCase = loginAdminUseCase;
    this._verifyAdminUseCase = verifyAdminUseCase;
    this._refreshAdminUseCase = refreshAdminUseCase;
    this._logoutAdminUseCase = logoutAdminUseCase;
  }

  async postAdminAuthentications({
    request,
    context: { credentials },
  }: HTTPHandlerProps) {
    const payload: LoginAdminUseCasePayload["payload"] = await request.json();
    const useCasePayload: LoginAdminUseCasePayload = {
      payload,
      credentials,
    };
    const { accessToken, accessTokenKey, refreshToken, refreshTokenKey } =
      await this._loginAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {
        accessToken,
        accessTokenKey,
        refreshToken,
        refreshTokenKey,
      },
      message: "Admin Logged in successfully",
    });

    return response;
  }

  async getAdminAuthentication({ context: { credentials } }: HTTPHandlerProps) {
    const useCasePayload: VerifyAdminUseCasePayload = {
      credentials,
    };
    const { accessToken, accessTokenKey } =
      await this._verifyAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: { accessToken, accessTokenKey },
      message: "Admin Verified",
    });
    return response;
  }

  async putAdminAuthentication({ context: { credentials } }: HTTPHandlerProps) {
    const useCasePayload: RefreshAdminUseCasePayload = {
      credentials,
    };
    const { accessToken: newAccessToken, accessTokenKey } =
      await this._refreshAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: { accessToken: newAccessToken, accessTokenKey },
      message: "Admin Token Refreshed",
    });
    return response;
  }

  async deleteAdminAuthentication({
    context: { credentials },
  }: HTTPHandlerProps) {
    const useCasePayload: LogoutAdminUseCasePayload = {
      credentials,
    };
    const { accessTokenKey, refreshTokenKey } =
      await this._logoutAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: { accessTokenKey, refreshTokenKey },
      message: "Admin Logged out successfully",
    });
    return response;
  }
}
