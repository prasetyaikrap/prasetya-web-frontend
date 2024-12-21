import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import NotFoundError from "@/services/commons/exceptions/NotFoundError";
import {
  ArticleAuthor,
  ArticleDocProps,
} from "@/services/commons/types/firestoreDoc";
import { QueryFilter } from "@/services/commons/types/query";
import {
  generateFirestoreQueries,
  getPaginationMetadata,
} from "@/services/commons/utils/query";

import { CreateArticlePayload } from "./entities/CreateArticleEntities";
import { UpdateArticleByIdPayload } from "./entities/UpdateArticleByIdEntities";

export type ArticlesRepositoryProps = {
  firestore: Firestore;
};

export type GetArticlesPayload = {
  filters: QueryFilter[];
  orders: string[];
  page: number;
  limit: number;
  cursor: string;
};

export type CreateArticlePayloadProps = {
  payload: CreateArticlePayload;
  createdBy: ArticleAuthor;
};

export type UpdateArticlePayloadProps = {
  payload: UpdateArticleByIdPayload;
  articleId: string;
};

export type GetArticleByIdProps = {
  articleId: string;
};

export type GetArticleBySlugProps = {
  slug: string;
};

export type UpdateArticleStatusByIdProps = {
  articleId: string;
  status: string;
};

export type DeleteArticleByIdProps = {
  articleId: string;
};

export default class ArticlesRepository {
  public _firestore: Firestore;
  public articlesCollectionRef: CollectionReference;
  public metadataCollectionRef: CollectionReference;

  constructor({ firestore }: ArticlesRepositoryProps) {
    this._firestore = firestore;
    this.articlesCollectionRef = this._firestore.collection("articles");
    this.metadataCollectionRef = this._firestore.collection("metadata");
  }

  async createArticle({ payload, createdBy }: CreateArticlePayloadProps) {
    const res = await this.articlesCollectionRef.add({
      ...payload,
      summary: "",
      content: "",
      featuredImage: "",
      categories: [],
      tags: [],
      author: createdBy,
      status: "unpublish",
      slug_histories: [],
      title_search: [],
      metadata: {},
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    });

    await this.metadataCollectionRef
      .doc("total_rows")
      .update({ articles: FieldValue.increment(1) });

    return { id: res.id };
  }

  async updateArticleById({ payload, articleId }: UpdateArticlePayloadProps) {
    const { title } = payload;
    const title_search = title.split(" ").map((v) => v.trim());
    const snapshot = await this.articlesCollectionRef.doc(articleId).update({
      ...payload,
      title_search,
      updated_at: FieldValue.serverTimestamp(),
    });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to update Article");
    }

    return { id: articleId };
  }

  async getArticles({
    filters,
    orders,
    limit,
    cursor,
    page,
  }: GetArticlesPayload) {
    const queries = generateFirestoreQueries({
      queryRef: this.articlesCollectionRef,
      filters,
      orders,
      limit,
      cursor,
    });

    const snapshot = await queries.get();
    const articlesData = snapshot.docs.map((doc) => {
      const d = doc.data() as ArticleDocProps;
      return {
        ...d,
        id: doc.id,
      };
    });

    const lastData = snapshot.docs[snapshot.docs.length - 1];
    const { currentPage, totalRows, totalPages, previousCursor, nextCursor } =
      await getPaginationMetadata({
        queryRef: this.metadataCollectionRef,
        totalRowsKey: "articles",
        limit,
        page,
        currentCursor: cursor || "",
        nextCursor: lastData.id,
      });

    return {
      data: articlesData,
      metadata: {
        total_rows: totalRows,
        current_page: currentPage,
        total_page: totalPages,
        per_page: limit,
        previousCursor,
        nextCursor,
      },
    };
  }

  async getArticleById({ articleId }: GetArticleByIdProps) {
    const snapshot = await this.articlesCollectionRef.doc(articleId).get();

    if (!snapshot.exists) {
      throw new NotFoundError("Admin Not Found");
    }

    const articleData = snapshot.data() as ArticleDocProps;

    return {
      ...articleData,
      id: snapshot.id,
    };
  }

  async getArticleBySlug({ slug }: GetArticleBySlugProps) {
    const snapshot = await this.articlesCollectionRef
      .where(
        Filter.or(
          Filter.where("slug", "==", slug),
          Filter.where("slug_histories", "array-contains", slug)
        )
      )
      .get();

    if (snapshot.empty) {
      throw new NotFoundError("Admin not found");
    }

    return {
      ...(snapshot.docs[0].data() as ArticleDocProps),
      id: snapshot.docs[0].id,
    };
  }

  async updateArticleStatusById({
    status,
    articleId,
  }: UpdateArticleStatusByIdProps) {
    const snapshot = await this.articlesCollectionRef.doc(articleId).update({
      status,
      updated_at: FieldValue.serverTimestamp(),
    });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to update status");
    }

    return { id: articleId };
  }

  async deleteArticleById({ articleId }: DeleteArticleByIdProps) {
    const snapshot = await this.articlesCollectionRef.doc(articleId).delete();

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to delete article");
    }

    return { id: articleId };
  }
}
