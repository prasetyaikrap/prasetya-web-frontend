import {
  CollectionReference,
  FieldValue,
  Firestore,
} from "firebase-admin/firestore";

import { ArticleDocProps } from "@/services/commons/types/firestoreDoc";
import { QueryFilter } from "@/services/commons/types/query";
import {
  generateFirestoreQueries,
  getPaginationMetadata,
} from "@/services/commons/utils/query";
import { UserField } from "@/types";

import { CreateArticlePayload } from "./entities/CreateArticleEntities";

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
}
