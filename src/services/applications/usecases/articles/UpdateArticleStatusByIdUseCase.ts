import { BaseUseCasePayload } from "@/services/commons/types/general";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import ArticlesRepository from "@/services/infrastructure/repository/articles/ArticlesRepository";
import UpdateArticleStatusByIdEntities, {
  UpdateArticleStatusByIdPayload,
} from "@/services/infrastructure/repository/articles/entities/UpdateArticleStatusByIdEntities";

export type UpdateArticleStatusByIdUseCaseProps = {
  articlesRepository: ArticlesRepository;
  adminRepository: AdminRepository;
};

export type UpdateArticleStatusByIdUseCasePayload = {
  articleId: string;
  payload: UpdateArticleStatusByIdPayload;
} & BaseUseCasePayload;

export default class UpdateArticleStatusByIdUseCase {
  public _articleRepository: ArticlesRepository;
  public _adminRepository: AdminRepository;

  constructor({
    articlesRepository,
    adminRepository,
  }: UpdateArticleStatusByIdUseCaseProps) {
    this._articleRepository = articlesRepository;
    this._adminRepository = adminRepository;
  }

  async execute({
    payload,
    articleId,
    credentials: { tokenPayload },
  }: UpdateArticleStatusByIdUseCasePayload) {
    const {
      payload: { status },
    } = new UpdateArticleStatusByIdEntities(payload);

    const { id, name, email, avatar } =
      await this._adminRepository.getAdminById({
        adminId: tokenPayload?.payload.profile.id || "",
      });

    return await this._articleRepository.updateArticleStatusById({
      articleId,
      status,
      updatedBy: {
        id,
        name,
        email,
        avatar,
      },
    });
  }
}
