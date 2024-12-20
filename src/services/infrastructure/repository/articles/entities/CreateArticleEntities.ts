import { match, P } from "ts-pattern";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import { ArticleDocProps } from "@/services/commons/types/firestoreDoc";

export type CreateArticlePayload = Pick<
  ArticleDocProps,
  | "title"
  | "summary"
  | "slug"
  | "categories"
  | "tags"
  | "featuredImage"
  | "content"
  | "publicity"
  | "status"
  | "author"
  | "metadata"
  | "slug_histories"
>;

export default class CreateArticleEntities {
  public payload: CreateArticlePayload;

  constructor(payload: CreateArticlePayload) {
    this._verifyPayload(payload);
    const {
      title,
      summary,
      slug,
      categories,
      tags,
      featuredImage,
      content,
      publicity,
      status,
      author,
      metadata,
      slug_histories,
    } = payload;

    this.payload = {
      title,
      summary,
      slug,
      categories,
      tags,
      featuredImage,
      content,
      publicity,
      status,
      author,
      metadata,
      slug_histories,
    };
  }

  _verifyPayload(payload: CreateArticlePayload) {
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
          publicity: P.not(P.array(P.string)),
          status: P.not(P.string),
          author: P.not(
            P.array({
              id: P.string,
              name: P.string,
              email: P.string,
              avatar: P.string,
            })
          ),
          slug_histories: P.not(P.array(P.string)),
        },
        () => {
          throw new InvariantError("Create Article Failed. Invalid Payload");
        }
      )
      .otherwise(() => {});
  }
}
