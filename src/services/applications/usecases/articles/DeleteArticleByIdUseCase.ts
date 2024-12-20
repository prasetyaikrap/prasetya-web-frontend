import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import ArticlesRepository from "@/services/infrastructure/repository/articles/ArticlesRepository";

export type DeleteArticleByIdUseCaseProps = {
  articlesRepository: ArticlesRepository;
};

export type DeleteArticleByIdUseCasePayload = {
  articleId: string;
} & BaseUseCasePayload;

export default class DeleteArticleByIdUseCase {
  public _articleRepository: ArticlesRepository;

  constructor({ articlesRepository }: DeleteArticleByIdUseCaseProps) {
    this._articleRepository = articlesRepository;
  }

  async execute({ articleId }: DeleteArticleByIdUseCasePayload) {
    return await this._articleRepository.deleteArticleById({
      articleId,
    });
  }
}
