import { match, P } from "ts-pattern";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { ArticleDocProps } from "@/services/commons/types/firestoreDoc";

export type UpdateArticleByIdPayload = Pick<
  ArticleDocProps,
  | "title"
  | "summary"
  | "slug"
  | "categories"
  | "tags"
  | "featuredImage"
  | "content"
  | "visibility"
  | "author"
  | "metadata"
  | "slug_histories"
>;

export default class UpdateArticleByIdEntities {
  public payload: UpdateArticleByIdPayload;

  constructor(payload: UpdateArticleByIdPayload) {
    this._verifyPayload(payload);
    this.payload = payload;
  }

  _verifyPayload(payload: UpdateArticleByIdPayload) {
    match(payload)
      .with(
        {
          title: P.not(P.string),
          summary: P.not(P.string),
          slug: P.not(P.string),
          categories: P.not(P.array({ id: P.string, value: P.string })),
          tags: P.not(P.array({ id: P.string, value: P.string })),
          featuredImage: P.not(P.string),
          content: P.not(P.string),
          visibility: P.not({ publicity: P.string, status: P.string }),
          author: P.not(
            P.array({
              id: P.string,
              name: P.string,
              email: P.string,
              avatar: P.string,
            })
          ),
          slug_histories: P.not(P.array(P.string)),
          metadata: P.nullish,
        },
        () => {
          throw new InvariantError("Update Article Failed. Invalid Payload");
        }
      )
      .otherwise(() => {});
  }
}
