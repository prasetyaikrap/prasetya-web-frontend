import { match, P } from "ts-pattern";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { ArticleDocProps } from "@/services/commons/types/firestoreDoc";

export type UpdateArticleStatusByIdPayload = {
  status: ArticleDocProps["status"];
};

export default class UpdateArticleStatusByIdEntities {
  public payload: UpdateArticleStatusByIdPayload;

  constructor(payload: UpdateArticleStatusByIdPayload) {
    this._verifyPayload(payload);

    const { status } = payload;
    this.payload = { status };
  }

  _verifyPayload(payload: UpdateArticleStatusByIdPayload) {
    match(payload)
      .with(
        {
          status: P.nullish,
        },
        () => {
          throw new InvariantError("Update Article Failed. Invalid Payload");
        }
      )
      .otherwise(() => {});
  }
}
