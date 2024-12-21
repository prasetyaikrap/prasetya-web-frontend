import {
  BaseKey,
  BaseRecord,
  CrudFilters,
  CrudSorting,
  MetaQuery,
} from "@refinedev/core";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

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

export type InitClientProps<TContract> = {
  contract: TContract;
  baseUrl: string;
  httpClient?: AxiosInstance;
};

export type BaseResponseBody = {
  success: boolean;
  message: string;
  data?: BaseRecord;
  error?: Error;
};

export type BaseResponsesBody = BaseResponseBody & {
  error?: Error;
  metadata: {
    total_rows: number;
    total_page: number;
    current_page: number;
    per_page: number;
    previousCursor: string;
    nextCursor: string;
  };
};

export type CustomMetaQuery = {
  transformFilters?: (filters?: CrudFilters) => CrudFilters;
  transformSorters?: (sorters?: CrudSorting) => CrudSorting;
  paginationMode?: "default" | "per_page" | "none";
  filterMode?: "default";
} & MetaQuery;
