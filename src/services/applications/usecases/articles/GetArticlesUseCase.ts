import { BaseUseCasePayload } from "@/services/commons/types/general";
import { generateFilters } from "@/services/commons/utils/query";
import ArticlesRepository from "@/services/infrastructure/repository/articles/ArticlesRepository";
import QueryPagination, {
  QueryPaginationPayload,
} from "@/services/infrastructure/repository/general/entities/QueryPagination";

export type GetArticlesUseCaseProps = {
  articlesRepository: ArticlesRepository;
};

export type GetArticlesUseCasePayload = {
  queryParams: QueryPaginationPayload;
} & BaseUseCasePayload;

export default class GetArticlesUseCase {
  public _articleRepository: ArticlesRepository;

  constructor({ articlesRepository }: GetArticlesUseCaseProps) {
    this._articleRepository = articlesRepository;
  }

  async execute({ queryParams }: GetArticlesUseCasePayload) {
    const { queries, _page, _limit, _sort } = new QueryPagination(queryParams);
    const offset = _page * _limit;
    const filters = generateFilters(queries);
    const orders = _sort?.split(",") || [];

    return await this._articleRepository.getArticles({
      filters,
      orders,
      limit: _limit,
      offset,
    });
  }
}
