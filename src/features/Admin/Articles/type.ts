import { Metadata } from "next";
import { z } from "zod";

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

export type ArticleAuthor = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

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
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
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
};
