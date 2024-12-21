import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import ArticlesRepository from "@/services/infrastructure/repository/articles/ArticlesRepository";
import UpdateArticleEntities, {
  UpdateArticleByIdPayload,
} from "@/services/infrastructure/repository/articles/entities/UpdateArticleByIdEntities";

export type UpdateArticleByIdUseCaseProps = {
  articlesRepository: ArticlesRepository;
  adminRepository: AdminRepository;
};

export type UpdateArticleByIdUseCasePayload = {
  articleId: string;
  payload: UpdateArticleByIdPayload;
} & BaseUseCasePayload;

export default class UpdateArticleByIdUseCase {
  public _articleRepository: ArticlesRepository;
  public _adminRepository: AdminRepository;

  constructor({
    articlesRepository,
    adminRepository,
  }: UpdateArticleByIdUseCaseProps) {
    this._articleRepository = articlesRepository;
    this._adminRepository = adminRepository;
  }

  async execute({ payload, articleId }: UpdateArticleByIdUseCasePayload) {
    const { payload: validPayload } = new UpdateArticleEntities(payload);

    return await this._articleRepository.updateArticleById({
      articleId,
      payload: validPayload,
    });
  }
}
