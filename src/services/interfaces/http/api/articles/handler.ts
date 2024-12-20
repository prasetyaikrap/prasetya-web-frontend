import CreateArticleUseCase, {
  CreateArticleUseCasePayload,
} from "@/services/applications/usecases/articles/CreateArticleUseCase";
import DeleteArticleByIdUseCase, {
  DeleteArticleByIdUseCasePayload,
} from "@/services/applications/usecases/articles/DeleteArticleByIdUseCase";
import GetArticleByIdOrSlugUseCase, {
  GetArticleByIdOrSlugUseCasePayload,
} from "@/services/applications/usecases/articles/GetArticleByIdOrSlugUseCase";
import GetArticlesUseCase, {
  GetArticlesUseCasePayload,
} from "@/services/applications/usecases/articles/GetArticlesUseCase";
import UpdateArticleByIdUseCase, {
  UpdateArticleByIdUseCasePayload,
} from "@/services/applications/usecases/articles/UpdateArticleByIdUseCase";
import UpdateArticleStatusByIdUseCase, {
  UpdateArticleStatusByIdUseCasePayload,
} from "@/services/applications/usecases/articles/UpdateArticleStatusByIdUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";
import { isPublicEndpoint } from "@/services/commons/utils/general";
import { getPaginationSearchParams } from "@/services/commons/utils/query";

export type ArticlesHandlerProps = {
  createArticleUseCase: CreateArticleUseCase;
  updateArticleByIdUseCase: UpdateArticleByIdUseCase;
  getArticlesUseCase: GetArticlesUseCase;
  getArticleByIdOrSlugUseCase: GetArticleByIdOrSlugUseCase;
  updateArticleStatusByIdUseCase: UpdateArticleStatusByIdUseCase;
  deleteArticleByIdUseCase: DeleteArticleByIdUseCase;
};

export default class ArticlesHandler {
  public _createArticleUseCase: ArticlesHandlerProps["createArticleUseCase"];
  public _updateArticleByIdUseCase: ArticlesHandlerProps["updateArticleByIdUseCase"];
  public _getArticlesUseCase: ArticlesHandlerProps["getArticlesUseCase"];
  public _getArticleByIdOrSlugUseCase: ArticlesHandlerProps["getArticleByIdOrSlugUseCase"];
  public _updateArticleStatusByIdUseCase: ArticlesHandlerProps["updateArticleStatusByIdUseCase"];
  public _deleteArticleByIdUseCase: ArticlesHandlerProps["deleteArticleByIdUseCase"];

  constructor({
    createArticleUseCase,
    updateArticleByIdUseCase,
    getArticlesUseCase,
    getArticleByIdOrSlugUseCase,
    updateArticleStatusByIdUseCase,
    deleteArticleByIdUseCase,
  }: ArticlesHandlerProps) {
    this._createArticleUseCase = createArticleUseCase;
    this._updateArticleByIdUseCase = updateArticleByIdUseCase;
    this._getArticlesUseCase = getArticlesUseCase;
    this._getArticleByIdOrSlugUseCase = getArticleByIdOrSlugUseCase;
    this._updateArticleStatusByIdUseCase = updateArticleStatusByIdUseCase;
    this._deleteArticleByIdUseCase = deleteArticleByIdUseCase;
  }

  async postArticle({ request, context: { credentials } }: HTTPHandlerProps) {
    const payload: CreateArticleUseCasePayload["payload"] =
      await request.json();
    const useCasePayload: CreateArticleUseCasePayload = {
      payload,
      credentials,
    };

    const { id } = await this._createArticleUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      code: 201,
      data: {
        id,
      },
      message: "Article created successfully",
    });

    return response;
  }

  async putArticleById({
    request,
    routeParams: { id: articleId },
    context: { credentials },
  }: HTTPHandlerProps) {
    const payload: UpdateArticleByIdUseCasePayload["payload"] =
      await request.json();
    const useCasePayload: UpdateArticleByIdUseCasePayload = {
      articleId,
      payload,
      credentials,
    };

    const { id } = await this._updateArticleByIdUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {
        id,
      },
      message: "Article updated successfully",
    });

    return response;
  }

  async getArticles({
    request,
    context: { credentials, params },
  }: HTTPHandlerProps) {
    const queryParams = getPaginationSearchParams({
      request,
    });
    const isPublic = isPublicEndpoint(params);

    const useCasePayload: GetArticlesUseCasePayload = {
      credentials,
      queryParams,
      isPublic,
    };

    const { data: articlesData, metadata } =
      await this._getArticlesUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: articlesData,
      message: "Articles Collected Successfully",
      metadata,
    });

    return response;
  }

  async getArticleByIdOrSlug({
    request,
    routeParams: { id: articleId },
    context: { credentials, params },
  }: HTTPHandlerProps) {
    const { queries } = getPaginationSearchParams({
      request,
    });
    const isPublic = isPublicEndpoint(params);
    const idType = queries?.id_type || "id";

    const useCasePayload: GetArticleByIdOrSlugUseCasePayload = {
      credentials,
      articleId,
      idType,
      isPublic,
    };

    const { data: articlesData } =
      await this._getArticleByIdOrSlugUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: articlesData,
      message: "Article Found",
    });

    return response;
  }

  async putArticleStatusById({
    request,
    routeParams: { id: articleId },
    context: { credentials },
  }: HTTPHandlerProps) {
    const payload: UpdateArticleStatusByIdUseCasePayload["payload"] =
      await request.json();
    const useCasePayload: UpdateArticleStatusByIdUseCasePayload = {
      articleId,
      payload,
      credentials,
    };

    const { id } =
      await this._updateArticleStatusByIdUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {
        id,
      },
      message: "Article status updated successfully",
    });

    return response;
  }

  async deleteArticleById({
    routeParams: { id: articleId },
    context: { credentials },
  }: HTTPHandlerProps) {
    const useCasePayload: DeleteArticleByIdUseCasePayload = {
      articleId,
      credentials,
    };

    const { id } = await this._deleteArticleByIdUseCase.execute(useCasePayload);

    const response = SuccessResponse({
      data: {
        id,
      },
      message: "Article deleted successfully",
    });

    return response;
  }
}
