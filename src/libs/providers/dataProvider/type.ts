import {
  BaseKey,
  BaseRecord,
  CrudFilters,
  CrudSorting,
  MetaQuery,
} from "@refinedev/core";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ZodType } from "zod";

export type MethodTypes = "GET" | "DELETE" | "HEAD" | "OPTIONS";
export type MethodTypesWithBody = "POST" | "PUT" | "PATCH";

export type AxiosMethodTypes =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

export type ExtendedAxiosRequestConfig = {
  routeParams?: Record<string, BaseKey>;
} & AxiosRequestConfig;

export type BaseAPISchema = {
  method: string;
  path: string;
  summary: string;
  response: {
    success: ZodType;
    failed: ZodType;
  };
  payload?: ZodType;
  query?: ZodType;
};

export type InitClientProps<TSchema> = {
  schema: TSchema;
  baseUrl: string;
  httpClient?: AxiosInstance;
};

export type BaseResponseBody = {
  success: boolean;
  message: string;
  data?: BaseRecord;
  error?: Error;
  metadata?: {
    total_rows: number;
    total_page: number;
    curent_page: number;
    per_page: number;
  };
};

export type CustomMetaQuery = {
  transformFilters?: (filters?: CrudFilters) => CrudFilters;
  transformSorters?: (sorters?: CrudSorting) => CrudSorting;
  paginationMode?: "default" | "per_page" | "none";
  filterMode?: "default";
} & MetaQuery;
