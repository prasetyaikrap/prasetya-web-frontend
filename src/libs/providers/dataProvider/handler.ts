import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

import { axiosInstance } from "@/libs/axios";

import {
  AxiosMethodTypes,
  BaseAPISchema,
  BaseResponseBody,
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
          config?: AxiosRequestConfig
        ) => Promise<AxiosResponse<TData>>;
      },
      current
    ) => {
      const { method, path } = schema[current as keyof T];
      const axiosMethod = method.toLowerCase() as AxiosMethodTypes;
      result[current as keyof T] = async (config?: AxiosRequestConfig) => {
        return await httpClient[axiosMethod](`${baseUrl}/${path}`, config);
      };

      return result;
    },
    {} as never
  );
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
