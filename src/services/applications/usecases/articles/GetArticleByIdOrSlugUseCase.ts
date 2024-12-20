import { BaseUseCasePayload } from "@/services/commons/types/general";
import ArticlesRepository from "@/services/infrastructure/repository/articles/ArticlesRepository";

export type GetArticleByIdOrSlugUseCaseProps = {
  articlesRepository: ArticlesRepository;
};

export type GetArticleByIdOrSlugUseCasePayload = {
  articleId: string;
  idType: string;
  isPublic: boolean;
} & BaseUseCasePayload;

export default class GetArticleByIdOrSlugUseCase {
  public _articleRepository: ArticlesRepository;

  constructor({ articlesRepository }: GetArticleByIdOrSlugUseCaseProps) {
    this._articleRepository = articlesRepository;
  }

  async execute({ articleId, idType }: GetArticleByIdOrSlugUseCasePayload) {
    if (idType === "slug") {
      const articleDataBySlug = await this._articleRepository.getArticleBySlug({
        slug: articleId,
      });

      const {
        slug_histories: _slugHistories,
        title_search: _titleSearch,
        ...articleData
      } = articleDataBySlug;
      return { data: articleData };
    }

    const articleDataById = await this._articleRepository.getArticleById({
      articleId,
    });

    const {
      slug_histories: _slugHistories,
      title_search: _titleSearch,
      ...articleData
    } = articleDataById;

    return { data: articleData };
  }
}
