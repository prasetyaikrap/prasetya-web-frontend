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
import { getCredentials } from "@/services/commons/utils/general";

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

  async postAdminAuthentications({ request }: HTTPHandlerProps) {
    const payload: LoginAdminUseCasePayload["payload"] = await request.json();
    const { clientId } = getCredentials({ request });
    const useCasePayload: LoginAdminUseCasePayload = {
      payload,
      auth: {
        clientId,
      },
    };
    const { accessToken, refreshToken } =
      await this._loginAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {
        accessToken,
        refreshToken,
      },
      message: "Admin Logged in successfully",
    });

    return response;
  }

  async getAdminAuthentication({ request }: HTTPHandlerProps) {
    const { accessToken, refreshToken, clientId } = getCredentials({ request });
    const useCasePayload: VerifyAdminUseCasePayload = {
      auth: {
        accessToken,
        refreshToken,
        clientId,
      },
    };
    const { accessToken: validatedAccessToken } =
      await this._verifyAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: { accessToken: validatedAccessToken },
      message: "Admin Verified",
    });
    return response;
  }

  async putAdminAuthentication({ request }: HTTPHandlerProps) {
    const { accessToken, refreshToken, clientId } = getCredentials({ request });
    const useCasePayload: RefreshAdminUseCasePayload = {
      auth: {
        accessToken,
        refreshToken,
        clientId,
      },
    };
    const { accessToken: newAccessToken } =
      await this._refreshAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: { accessToken: newAccessToken },
      message: "Admin Token Refreshed",
    });
    return response;
  }

  async deleteAdminAuthentication({ request }: HTTPHandlerProps) {
    const { accessToken, refreshToken, clientId } = getCredentials({ request });
    const useCasePayload: LogoutAdminUseCasePayload = {
      auth: {
        accessToken,
        refreshToken,
        clientId,
      },
    };
    await this._logoutAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: { loggedOut: true },
      message: "Admin Logged out successfully",
    });
    return response;
  }
}
