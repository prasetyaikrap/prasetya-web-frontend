import RegisterAdminUseCase, {
  RegisterAdminUseCasePayload,
} from "@/services/applications/usecases/admins/RegisterAdminUseCase";
import VerifyAdminUseCase from "@/services/applications/usecases/authentications/VerifyAdminUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";
import { getCredentials } from "@/services/commons/utils/general";

export type AdminsHandlerProps = {
  registerAdminUseCase: RegisterAdminUseCase;
  verifyAdminUseCase: VerifyAdminUseCase;
};

export default class AdminsHandler {
  public _registerAdminUseCase: RegisterAdminUseCase;
  public _verifyAdminUseCase: VerifyAdminUseCase;

  constructor({
    registerAdminUseCase,
    verifyAdminUseCase,
  }: AdminsHandlerProps) {
    this._registerAdminUseCase = registerAdminUseCase;
    this._verifyAdminUseCase = verifyAdminUseCase;
  }

  async postAdminUser({ request }: HTTPHandlerProps) {
    const payload: RegisterAdminUseCasePayload["payload"] =
      await request.json();
    const { clientId, accessToken, refreshToken } = getCredentials({ request });
    const useCasePayload: RegisterAdminUseCasePayload = {
      payload,
      auth: {
        clientId,
        accessToken,
        refreshToken,
      },
    };

    await this._verifyAdminUseCase.execute(useCasePayload);
    const { id } = await this._registerAdminUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {
        id,
      },
      message: "Admin Registered successfully",
    });

    return response;
  }
}
