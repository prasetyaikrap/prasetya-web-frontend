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
    const { queries, _page, _limit, _sort, _cursor } = new QueryPagination(
      queryParams,
      [
        "title_search__arrayContainsAny",
        "categories__arrayContainsAny",
        "tags__arrayContainsAny",
        "publicity__contains",
        "status__equal",
        "author.email__equal",
        "author.id__equal",
        "created_at__dateLessThan",
        "created_at__dateLessThanEqual",
        "created_at__dateGreaterThan",
        "created_at__dateGreaterThanEqual",
        "updated_at__dateLessThan",
        "updated_at__dateLessThanEqual",
        "updated_at__dateGreaterThan",
        "updated_at__dateGreaterThanEqual",
      ]
    );

    const orders = _sort?.split(",") || [];

    const modifiedQueries = match({ isPublic })
      .with({ isPublic: true }, () => ({
        ...queries,
        status__equal: "published",
      }))
      .otherwise(() => queries);

    const filters = generateFilters(modifiedQueries);

    const { data, metadata } = await this._articleRepository.getArticles({
      filters,
      orders,
      limit: _limit,
      page: _page,
      cursor: _cursor,
    });

    const filteredData = data.map((d) => {
      const {
        metadata: _metadata,
        content: _content,
        slug_histories: _slugHistories,
        title_search: _titleSearch,
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
