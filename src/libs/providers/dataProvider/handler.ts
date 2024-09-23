import {
  BaseKey,
  CrudFilters,
  CrudSorting,
  LogicalFilter,
  Pagination,
} from "@refinedev/core";
import { AxiosResponse, isAxiosError } from "axios";
import { match, P } from "ts-pattern";

import { axiosInstance } from "@/libs/axios";

import {
  AxiosMethodTypes,
  BaseAPISchema,
  BaseResponseBody,
  CustomMetaQuery,
  ExtendedAxiosRequestConfig,
  InitClientProps,
} from "./type";

export function initClient<T extends { [key: string]: BaseAPISchema }>({
  schema,
  baseUrl,
  httpClient = axiosInstance,
}: InitClientProps<T>) {
  const schemaKeys = Object.keys(schema) as (keyof T)[];

  return schemaKeys.reduce(
    (
      result: {
        [K in keyof T]: <TData = any>(
          config?: ExtendedAxiosRequestConfig
        ) => Promise<AxiosResponse<TData>>;
      },
      current
    ) => {
      const { method, path } = schema[current as keyof T];
      const axiosMethod = method.toLowerCase() as AxiosMethodTypes;
      result[current as keyof T] = async (
        config?: ExtendedAxiosRequestConfig
      ) => {
        const routeParams = config?.routeParams;
        const route = match(routeParams)
          .with(P.not(P.nullish), (params) => {
            const basePath = `${baseUrl}/${path}`;
            return replaceRouteParams(basePath, params);
          })
          .otherwise(() => `${baseUrl}/${path}`);
        return await httpClient[axiosMethod](route, config);
      };

      return result;
    },
    {} as never
  );
}

function replaceRouteParams(
  pattern: string,
  params: Record<string, BaseKey>
): string {
  return pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (params[key]) {
      return String(params[key]);
    }
    throw new Error(`Missing value for parameter: ${key}`);
  });
}

export function responseOk<T extends BaseResponseBody>(res: AxiosResponse<T>) {
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }

  return {
    data: res.data.data || {},
  };
}

export function responsesOk<T extends BaseResponseBody>(res: AxiosResponse<T>) {
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }

  const {
    data: { data, metadata },
  } = res;

  return {
    data,
    total: metadata?.total_rows || (data as object[])?.length || 0,
  };
}

export function responseError(err: unknown) {
  if (isAxiosError(err)) {
    return Promise.reject(`Axios error: ${err.message}`);
  } else {
    return Promise.reject(`Unknown error: ${err}`);
  }
}

export function generateParams(
  filters: CrudFilters = [],
  sorters: CrudSorting = [],
  pagination: Pagination = { current: 1, pageSize: 10, mode: "server" },
  opts?: {
    filterMode?: CustomMetaQuery["filterMode"];
    transformFilters?: CustomMetaQuery["transformFilters"];
    transformSorters?: CustomMetaQuery["transformSorters"];
    paginationMode?: CustomMetaQuery["paginationMode"];
  }
) {
  const paramsPagination = match(opts?.paginationMode)
    .with("none", () => undefined)
    .otherwise(() => ({
      _page: pagination.current,
      _limit: pagination.pageSize,
    }));

  const transformedFilters = opts?.transformFilters?.(filters) || filters;
  const paramsFilter = transformedFilters.reduce(
    (
      params: Record<string, string | number | boolean | undefined>,
      currentValue
    ) => {
      const { field, value } = currentValue as Omit<LogicalFilter, "value"> & {
        value: string | number | boolean | undefined;
      };

      return { ...params, [field]: value };
    },
    {}
  );

  const transformedSorters = opts?.transformSorters?.(sorters) || sorters;
  const sorterString = transformedSorters
    .map((sorter) => {
      if (sorter.order === "asc") {
        return sorter.field;
      }
      return `-${sorter.field}`;
    })
    .join(",");
  const paramsSorter = sorterString ? { _sort: sorterString } : {};

  return { ...paramsPagination, ...paramsFilter, ...paramsSorter };
}
