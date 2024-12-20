import { match } from "ts-pattern";

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
  isPublic: boolean;
} & BaseUseCasePayload;

export default class GetArticlesUseCase {
  public _articleRepository: ArticlesRepository;

  constructor({ articlesRepository }: GetArticlesUseCaseProps) {
    this._articleRepository = articlesRepository;
  }

  async execute({ queryParams, isPublic }: GetArticlesUseCasePayload) {
    const { queries, _page, _limit, _sort } = new QueryPagination(queryParams);
    const offset = _page * _limit;
    const orders = _sort?.split(",") || [];

    const modifiedQueries = match({ isPublic })
      .with({ isPublic: true }, () => ({
        ...queries,
        "visibility.status__equal": "published",
      }))
      .otherwise(() => queries);

    const filters = generateFilters(modifiedQueries);

    const { data, metadata } = await this._articleRepository.getArticles({
      filters,
      orders,
      limit: _limit,
      offset,
    });

    const filteredData = data.map((d) => {
      const {
        metadata: _metadata,
        content: _content,
        slug_histories: _slugHistories,
        ...selectedData
      } = d;
      return selectedData;
    });

    return {
      data: filteredData,
      metadata,
    };
  }
}
