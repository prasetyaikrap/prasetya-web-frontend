import {
  AuthTokenPayload,
  BaseUseCasePayload,
} from "@/services/commons/types/general";
import { generateFilters } from "@/services/commons/utils/query";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import VerifyAdmin from "@/services/infrastructure/repository/admins/entities/VerifyAdmin";
import ClientIdentityAuth from "@/services/infrastructure/repository/authentications/entities/ClientIdentityAuth";
import QueryPagination, {
  QueryPaginationPayload,
} from "@/services/infrastructure/repository/general/entities/QueryPagination";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";

export type GetAdminsUseCaseProps = {
  adminRepository: AdminRepository;
  authTokenManager: AuthTokenManager;
};

export type GetAdminsUseCasePayload = {
  queryParams: QueryPaginationPayload;
} & BaseUseCasePayload;

export default class GetAdminsUseCase {
  public _adminRepository: AdminRepository;
  public _authTokenManager: AuthTokenManager;
  constructor({ adminRepository, authTokenManager }: GetAdminsUseCaseProps) {
    this._adminRepository = adminRepository;
    this._authTokenManager = authTokenManager;
  }

  async execute({ queryParams, auth }: GetAdminsUseCasePayload) {
    new ClientIdentityAuth({ clientId: auth?.clientId || "" });
    const { accessToken } = new VerifyAdmin({
      accessToken: auth?.accessToken || "",
      refreshToken: auth?.refreshToken || "",
    });
    await this._authTokenManager.verifyAccessToken<AuthTokenPayload>(
      accessToken
    );

    const { queries, _page, _limit, _sort } = new QueryPagination(queryParams);
    const offset = _page * _limit;
    const filters = generateFilters(queries);
    const orders = _sort?.split(",") || [];

    return await this._adminRepository.getAdmins({
      filters,
      orders,
      limit: _limit,
      offset,
    });
  }
}
