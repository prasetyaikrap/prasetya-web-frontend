import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import ArticlesRepository from "@/services/infrastructure/repository/articles/ArticlesRepository";
import CreateArticleEntities, {
  CreateArticlePayload,
} from "@/services/infrastructure/repository/articles/entities/CreateArticleEntities";

export type CreateArticleUseCaseProps = {
  articlesRepository: ArticlesRepository;
  adminRepository: AdminRepository;
};

export type CreateArticleUseCasePayload = {
  payload: CreateArticlePayload;
} & BaseUseCasePayload;

export default class CreateArticleUseCase {
  public _articleRepository: ArticlesRepository;
  public _adminRepository: AdminRepository;

  constructor({
    articlesRepository,
    adminRepository,
  }: CreateArticleUseCaseProps) {
    this._articleRepository = articlesRepository;
    this._adminRepository = adminRepository;
  }

  async execute({
    payload,
    credentials: { tokenPayload },
  }: CreateArticleUseCasePayload) {
    const { payload: validPayload } = new CreateArticleEntities(payload);

    const { id, name, email, avatar } =
      await this._adminRepository.getAdminById({
        adminId: tokenPayload?.payload.profile.id || "",
      });

    return await this._articleRepository.createArticle({
      payload: validPayload,
      createdBy: { id, email, name, avatar },
    });
  }
}
