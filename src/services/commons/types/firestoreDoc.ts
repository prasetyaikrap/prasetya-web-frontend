import { Metadata } from "next";

import { UserField } from "@/types";

export type AdminDocProps = {
  id: string;
  username: string;
  hash_password: string;
  name: string;
  email: string;
  avatar: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
};

export type AuthenticationDocProps = {
  userId: string;
  refreshTokens: string[];
};

export type MetadataTotalRowsDocProp = Record<string, number>;

export type ArticleAuthor = UserField;

export type ArticleDocProps = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
  content: string;

  metadata: Metadata;
  publicity: string[];
  status: string;
  author: ArticleAuthor;
  created_at: string;
  updated_at: string;

  slug_histories: string[];
  title_search: string[];
};
