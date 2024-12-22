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
import { convertTimestampToDateString } from "@/services/commons/utils/general";
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
    const articleDoc = this.articlesCollectionRef.doc();
    const totalRowsDoc = this.metadataCollectionRef.doc("total_rows");

    await this._firestore.runTransaction(async (t) => {
      t.set(articleDoc, {
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

      t.update(totalRowsDoc, { articles: FieldValue.increment(1) });
    });

    return { id: articleDoc.id };
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

  async getArticles({ filters, orders, limit, cursor }: GetArticlesPayload) {
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
        created_at: convertTimestampToDateString(d.created_at),
        updated_at: convertTimestampToDateString(d.updated_at),
      };
    });

    const lastData = snapshot.docs[snapshot.docs.length - 1];
    const metadata = await getPaginationMetadata({
      queryRef: this.metadataCollectionRef,
      totalRowsKey: "articles",
      limit,
      currentCursor: cursor || "",
      nextCursor: lastData.id,
    });

    return {
      data: articlesData,
      metadata,
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
      created_at: convertTimestampToDateString(articleData.created_at),
      updated_at: convertTimestampToDateString(articleData.updated_at),
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

    const articleData = snapshot.docs[0].data() as ArticleDocProps;

    return {
      ...articleData,
      id: snapshot.docs[0].id,
      created_at: convertTimestampToDateString(articleData.created_at),
      updated_at: convertTimestampToDateString(articleData.updated_at),
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
    const articleDoc = this.articlesCollectionRef.doc(articleId);
    const totalRowsDoc = this.metadataCollectionRef.doc("total_rows");

    await this._firestore.runTransaction(async (t) => {
      t.delete(articleDoc);
      t.update(totalRowsDoc, { articles: FieldValue.increment(-1) });
    });

    return { id: articleId };
  }
}
