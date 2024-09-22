import GetAdminsUseCase, {
  GetAdminsUseCasePayload,
} from "@/services/applications/usecases/admins/GetAdminsUseCase";
import RegisterAdminUseCase, {
  RegisterAdminUseCasePayload,
} from "@/services/applications/usecases/admins/RegisterAdminUseCase";
import VerifyAdminUseCase from "@/services/applications/usecases/authentications/VerifyAdminUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";
import { getCredentials } from "@/services/commons/utils/general";
import { getPaginationSearchParams } from "@/services/commons/utils/query";

export type AdminsHandlerProps = {
  verifyAdminUseCase: VerifyAdminUseCase;
  registerAdminUseCase: RegisterAdminUseCase;
  getAdminsUseCase: GetAdminsUseCase;
};

export default class AdminsHandler {
  public _verifyAdminUseCase: AdminsHandlerProps["verifyAdminUseCase"];
  public _registerAdminUseCase: AdminsHandlerProps["registerAdminUseCase"];
  public _getAdminsUseCase: AdminsHandlerProps["getAdminsUseCase"];

  constructor({
    registerAdminUseCase,
    verifyAdminUseCase,
    getAdminsUseCase,
  }: AdminsHandlerProps) {
    this._registerAdminUseCase = registerAdminUseCase;
    this._verifyAdminUseCase = verifyAdminUseCase;
    this._getAdminsUseCase = getAdminsUseCase;
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

  async getAdminsUser({ request }: HTTPHandlerProps) {
    const { queries, _page, _limit, _sort } = getPaginationSearchParams({
      request,
    });
    const { clientId, accessToken, refreshToken } = getCredentials({ request });
    const useCasePayload: GetAdminsUseCasePayload = {
      queryParams: {
        queries,
        _page,
        _limit,
        _sort,
      },
      auth: {
        clientId,
        accessToken,
        refreshToken,
      },
    };

    await this._verifyAdminUseCase.execute(useCasePayload);
    const { data: adminsData, metadata } =
      await this._getAdminsUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: adminsData,
      message: "Admin Registered successfully",
      metadata,
    });

    return response;
  }
}
