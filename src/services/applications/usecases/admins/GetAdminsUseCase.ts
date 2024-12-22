import { BaseUseCasePayload } from "@/services/commons/types/general";
import { generateFilters } from "@/services/commons/utils/query";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
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

  async execute({ queryParams }: GetAdminsUseCasePayload) {
    const { queries, _limit, _sort, _cursor } = new QueryPagination(
      queryParams,
      []
    );
    const filters = generateFilters(queries);
    const orders = _sort?.split(",") || [];

    return await this._adminRepository.getAdmins({
      filters,
      orders,
      limit: _limit,
      cursor: _cursor,
    });
  }
}
