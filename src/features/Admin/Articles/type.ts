import { Metadata } from "next";
import { z } from "zod";

import { UserField } from "@/types";

import { articleFormSchema } from "./constants";

export type ArticleFormFieldValues = z.infer<typeof articleFormSchema>;

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

export type ArticleData = {
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
  modified_at: string;
  modified_by: UserField;
};

export type ArticleUpdatePayload = {
  title: string;
  summary: string;
  slug: string;
  categories: ArticleCategory[];
  tags: ArticleTag[];
  featuredImage: string;
  content: string;

  visibility: ArticleVisibility;
  author: ArticleAuthor[];
  metadata: Metadata;
  slug_histories: string[];
};
