import { Timestamp } from "firebase-admin/firestore";
import { Metadata } from "next";

import { UserField } from "@/types";

export type AdminDocProps = {
  id: string;
  username: string;
  hash_password: string;
  name: string;
  email: string;
  avatar: string;
  is_verified: boolean;
  permissions: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type AuthenticationDocProps = {
  user_id: string;
  refresh_tokens: string[];
  verify_admin: {
    token: string;
    created_at: Timestamp;
  } | null;
  verify_reset_password: {
    token: string;
    created_at: Timestamp;
  } | null;
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
  created_at: Timestamp;
  updated_at: Timestamp;

  slug_histories: string[];
  title_search: string[];
};
