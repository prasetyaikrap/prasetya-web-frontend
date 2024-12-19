import CreateArticleUseCase, {
  CreateArticleUseCasePayload,
} from "@/services/applications/usecases/articles/CreateArticleUseCase";
import { SuccessResponse } from "@/services/commons/http/ResponseHandler";
import { HTTPHandlerProps } from "@/services/commons/types/general";

export type ArticlesHandlerProps = {
  createArticleUseCase: CreateArticleUseCase;
};

export default class ArticlesHandler {
  public _createArticleUseCase: ArticlesHandlerProps["createArticleUseCase"];

  constructor({ createArticleUseCase }: ArticlesHandlerProps) {
    this._createArticleUseCase = createArticleUseCase;
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
}
