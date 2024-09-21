import LoginAdminUseCase, {
  LoginAdminUseCasePayload,
} from "@/services/applications/usecases/authentications/LoginAdminUseCase";
import {
  AUTH_TOKENS,
  CLIENT_ID_KEY,
  CLIENT_IDS_ENUM,
} from "@/services/commons/constants/general";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";

export type AuthenticationsHandlerProps = {
  loginAdminUseCase: LoginAdminUseCase;
};

export default class AuthenticationsHandler {
  public _loginAdminUseCase: LoginAdminUseCase;
  constructor({ loginAdminUseCase }: AuthenticationsHandlerProps) {
    this._loginAdminUseCase = loginAdminUseCase;
  }

  async postAdminAuthentications({ request }: HTTPHandlerProps) {
    const payload: LoginAdminUseCasePayload["payload"] = await request.json();
    const clientId = request.headers.get(CLIENT_ID_KEY) || "";
    const useCasePayload: LoginAdminUseCasePayload = {
      payload,
      auth: {
        clientId,
      },
    };

    const { accessToken, refreshToken } =
      await this._loginAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {},
      message: "Admin Logged in successfully",
    });
    response.cookies.set({
      name: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].accessTokenKey,
      value: accessToken,
      httpOnly: true,
      path: "/",
    });
    response.cookies.set({
      name: AUTH_TOKENS[clientId as CLIENT_IDS_ENUM].refreshTokenKey,
      value: refreshToken,
      httpOnly: true,
      path: "/",
    });

    return response;
  }
}
