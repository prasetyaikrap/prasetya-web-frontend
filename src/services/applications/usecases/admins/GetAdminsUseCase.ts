import { BaseUseCasePayload } from "@/services/commons/types/general";
import { generateFilters } from "@/services/commons/utils/query";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import QueryPagination, {
  QueryPaginationPayload,
} from "@/services/infrastructure/repository/general/entities/QueryPagination";

export type GetAdminsUseCaseProps = {
  adminRepository: AdminRepository;
};

export type GetAdminsUseCasePayload = {
  queryParams: QueryPaginationPayload;
} & BaseUseCasePayload;

export default class GetAdminsUseCase {
  public _adminRepository: AdminRepository;
  constructor({ adminRepository }: GetAdminsUseCaseProps) {
    this._adminRepository = adminRepository;
  }

  async execute({ queryParams }: GetAdminsUseCasePayload) {
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
