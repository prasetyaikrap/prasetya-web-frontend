import GetAdminByIdUseCase, {
  GetAdminByIdUseCasePayload,
} from "@/services/applications/usecases/admins/GetAdminByIdUseCase";
import GetAdminsUseCase, {
  GetAdminsUseCasePayload,
} from "@/services/applications/usecases/admins/GetAdminsUseCase";
import RegisterAdminUseCase, {
  RegisterAdminUseCasePayload,
} from "@/services/applications/usecases/admins/RegisterAdminUseCase";
import UpdateAdminByIdUseCase, {
  UpdateAdminByIdUseCasePayload,
} from "@/services/applications/usecases/admins/UpdateAdminByIdUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";
import { getCredentials } from "@/services/commons/utils/general";
import { getPaginationSearchParams } from "@/services/commons/utils/query";

export type AdminsHandlerProps = {
  registerAdminUseCase: RegisterAdminUseCase;
  getAdminsUseCase: GetAdminsUseCase;
  getAdminByIdUseCase: GetAdminByIdUseCase;
  updateAdminByIdUseCase: UpdateAdminByIdUseCase;
};

export default class AdminsHandler {
  public _registerAdminUseCase: AdminsHandlerProps["registerAdminUseCase"];
  public _getAdminsUseCase: AdminsHandlerProps["getAdminsUseCase"];
  public _getAdminByIdUseCase: AdminsHandlerProps["getAdminByIdUseCase"];
  public _updateAdminByIdUseCase: AdminsHandlerProps["updateAdminByIdUseCase"];

  constructor({
    registerAdminUseCase,
    getAdminsUseCase,
    getAdminByIdUseCase,
    updateAdminByIdUseCase,
  }: AdminsHandlerProps) {
    this._registerAdminUseCase = registerAdminUseCase;
    this._getAdminsUseCase = getAdminsUseCase;
    this._getAdminByIdUseCase = getAdminByIdUseCase;
    this._updateAdminByIdUseCase = updateAdminByIdUseCase;
  }

  async postAdminUser({ request }: HTTPHandlerProps) {
    const payload: RegisterAdminUseCasePayload["payload"] =
      await request.json();
    const authCredentials = getCredentials({ request });
    const useCasePayload: RegisterAdminUseCasePayload = {
      payload,
      auth: {
        ...authCredentials,
      },
    };

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
    const queryParams = getPaginationSearchParams({
      request,
    });
    const authCredentials = getCredentials({ request });
    const useCasePayload: GetAdminsUseCasePayload = {
      queryParams,
      auth: {
        ...authCredentials,
      },
    };

    const { data: adminsData, metadata } =
      await this._getAdminsUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: adminsData,
      message: "Admin Registered successfully",
      metadata,
    });

    return response;
  }

  async getAdminUser({
    request,
    routeParams: { id: adminId },
  }: HTTPHandlerProps) {
    const authCredentials = getCredentials({ request });

    const useCasePayload: GetAdminByIdUseCasePayload = {
      adminId,
      auth: {
        ...authCredentials,
      },
    };
    const adminData = await this._getAdminByIdUseCase.execute(useCasePayload);
    const response = SuccessResponse({
      data: adminData,
      message: "Successfully get Admin Profile",
    });
    return response;
  }

  async updateAdminUser({
    request,
    routeParams: { id: adminId },
  }: HTTPHandlerProps) {
    const payload: UpdateAdminByIdUseCasePayload["payload"] =
      await request.json();
    const authCredentials = getCredentials({
      request,
    });

    const useCasePayload: UpdateAdminByIdUseCasePayload = {
      adminId,
      payload,
      auth: {
        ...authCredentials,
      },
    };

    await this._updateAdminByIdUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      message: "Successfully update admin info",
    });
    return response;
  }
}
