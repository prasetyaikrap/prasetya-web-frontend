import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";

import InvariantError from "@/services/commons/exceptions/InvariantError";
import NotFoundError from "@/services/commons/exceptions/NotFoundError";
import { ArticleDocProps } from "@/services/commons/types/firestoreDoc";
import { QueryFilter } from "@/services/commons/types/query";
import {
  generateFirestoreQueries,
  getPaginationMetadata,
} from "@/services/commons/utils/query";
import { UserField } from "@/types";

import { CreateArticlePayload } from "./entities/CreateArticleEntities";
import { UpdateArticleByIdPayload } from "./entities/UpdateArticleByIdEntities";

export type ArticlesRepositoryProps = {
  firestore: Firestore;
};

export type GetArticlesPayload = {
  filters: QueryFilter[];
  orders: string[];
  limit: number;
  offset: number;
};

export type CreateArticlePayloadProps = {
  payload: CreateArticlePayload;
  createdBy: UserField;
};

export type UpdateArticlePayloadProps = {
  payload: UpdateArticleByIdPayload;
  updatedBy: UserField;
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
  updatedBy: UserField;
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
      created_by: createdBy,
      created_at: FieldValue.serverTimestamp(),
      updated_by: createdBy,
      updated_at: FieldValue.serverTimestamp(),
    });

    await this.metadataCollectionRef
      .doc("total_rows")
      .update({ articles: FieldValue.increment(1) });

    return { id: res.id };
  }

  async updateArticleById({
    payload,
    updatedBy,
    articleId,
  }: UpdateArticlePayloadProps) {
    const snapshot = await this.articlesCollectionRef.doc(articleId).update({
      ...payload,
      updated_by: updatedBy,
      updated_at: FieldValue.serverTimestamp(),
    });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to update Article");
    }

    return { id: articleId };
  }

  async getArticles({ filters, orders, limit, offset }: GetArticlesPayload) {
    const queries = generateFirestoreQueries({
      queryRef: this.articlesCollectionRef,
      filters,
      orders,
      limit,
      offset,
    });

    const snapshot = await queries.get();
    const articlesData = snapshot.docs.map((doc) => {
      const d = doc.data() as ArticleDocProps;
      return {
        ...d,
        id: doc.id,
      };
    });

    const { currentPage, totalRows, totalPages } = await getPaginationMetadata({
      queryRef: this.metadataCollectionRef,
      totalRowsKey: "articles",
      limit,
      offset,
    });

    return {
      data: articlesData,
      metadata: {
        total_rows: totalRows,
        current_page: currentPage,
        total_page: totalPages,
        per_page: limit,
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
    updatedBy,
  }: UpdateArticleStatusByIdProps) {
    const snapshot = await this.articlesCollectionRef.doc(articleId).update({
      status,
      updated_by: updatedBy,
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
