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

export type ArticleVisibility = {
  publicity: string;
  status: string;
};

export type ArticleCategory = {
  id: string;
  value: string;
};

export type ArticleTag = {
  id: string;
  value: string;
};

export type ArticleAuthor = UserField;

export type ArticleDocProps = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  categories: ArticleCategory[];
  tags: ArticleTag[];
  featuredImage: string;
  content: string;

  metadata: Metadata;
  visibility: ArticleVisibility;
  author: ArticleAuthor[];
  slug_histories: string[];
  created_at: string;
  created_by: UserField;
  updated_at: string;
  updated_by: UserField;
};
