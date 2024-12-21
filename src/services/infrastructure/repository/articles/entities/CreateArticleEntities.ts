import { match, P } from "ts-pattern";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { ArticleDocProps } from "@/services/commons/types/firestoreDoc";

export type CreateArticlePayload = Pick<
  ArticleDocProps,
  "title" | "slug" | "publicity"
>;

export default class CreateArticleEntities {
  public payload: CreateArticlePayload;

  constructor(payload: CreateArticlePayload) {
    this._verifyPayload(payload);
    const { title, slug, publicity } = payload;

    this.payload = {
      title,
      slug,
      publicity,
    };
  }

  _verifyPayload(payload: CreateArticlePayload) {
    match(payload)
      .with(
        {
          title: P.not(P.string),
          slug: P.not(P.string),
          publicity: P.not(P.array(P.string)),
        },
        () => {
          throw new InvariantError("Create Article Failed. Invalid Payload");
        }
      )
      .otherwise(() => {});
  }
}
