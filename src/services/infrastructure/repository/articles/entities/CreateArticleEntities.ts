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
  | "metadata"
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
      metadata,
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
      metadata,
    };
  }

  _verifyPayload(payload: CreateArticlePayload) {
    match(payload)
      .with(
        {
          title: P.not(P.string),
          summary: P.not(P.string),
          slug: P.not(P.string),
          categories: P.not(P.array(P.string)),
          tags: P.not(P.array(P.string)),
          featuredImage: P.not(P.string),
          content: P.not(P.string),
          publicity: P.not(P.array(P.string)),
          status: P.not(P.string),
        },
        () => {
          throw new InvariantError("Create Article Failed. Invalid Payload");
        }
      )
      .otherwise(() => {});
  }
}
