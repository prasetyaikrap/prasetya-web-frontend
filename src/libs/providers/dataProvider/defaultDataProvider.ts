import type { CreateResponse, DataProvider } from "@refinedev/core";
import type { AxiosInstance } from "axios";
import { match } from "ts-pattern";

import { axiosInstance } from "@/libs/axios";

import { apiSchema, PostLoginAdminSuccessResponse } from "./appApiSchema";
import { initClient, responseError, responseOk } from "./handler";

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "getMany" | "createMany" | "updateMany" | "deleteMany" | "custom"
> => {
  const service = initClient({
    schema: apiSchema,
    baseUrl: apiUrl,
    httpClient,
  });

  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      return {
        data: { test: "" } as any,
        total: 0,
      };
    },

    create: async ({ resource, variables }) => {
      const response = match([resource])
        .with(["loginAdmin"], () =>
          service
            .postLoginAdmin<PostLoginAdminSuccessResponse>({ data: variables })
            .then(responseOk)
            .catch(responseError)
        )
        .otherwise(() => Promise.reject("Method not implemented")) as Promise<
        CreateResponse<never>
      >;

      return response;
    },

    update: async ({ resource, id, variables, meta }) => {
      return {
        data: { test: "" } as any,
      };
    },

    getOne: async ({ resource, id, meta }) => {
      return {
        data: { test: "" } as any,
        total: 0,
      };
    },

    deleteOne: async ({ resource, id, variables, meta }) => {
      return {
        data: { test: "" } as any,
        total: 0,
      };
    },

    getApiUrl: () => {
      return apiUrl;
    },
  };
};
