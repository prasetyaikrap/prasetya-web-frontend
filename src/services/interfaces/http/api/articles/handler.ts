import CreateArticleUseCase, {
  CreateArticleUseCasePayload,
} from "@/services/applications/usecases/articles/CreateArticleUseCase";
import GetArticlesUseCase, {
  GetArticlesUseCasePayload,
} from "@/services/applications/usecases/articles/GetArticlesUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";
import { getPaginationSearchParams } from "@/services/commons/utils/query";

export type ArticlesHandlerProps = {
  createArticleUseCase: CreateArticleUseCase;
  getArticlesUseCase: GetArticlesUseCase;
};

export default class ArticlesHandler {
  public _createArticleUseCase: ArticlesHandlerProps["createArticleUseCase"];
  public _getArticlesUseCase: ArticlesHandlerProps["getArticlesUseCase"];

  constructor({
    createArticleUseCase,
    getArticlesUseCase,
  }: ArticlesHandlerProps) {
    this._createArticleUseCase = createArticleUseCase;
    this._getArticlesUseCase = getArticlesUseCase;
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
      data: {
        id,
      },
      message: "Article created successfully",
    });

    return response;
  }

  async getArticles({ request, context: { credentials } }: HTTPHandlerProps) {
    const queryParams = getPaginationSearchParams({
      request,
    });
    const useCasePayload: GetArticlesUseCasePayload = {
      credentials,
      queryParams,
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
}
