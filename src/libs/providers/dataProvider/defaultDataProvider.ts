import type {
  CreateResponse,
  DataProvider,
  DeleteOneResponse,
  GetListResponse,
  GetOneResponse,
  UpdateResponse,
} from "@refinedev/core";
import type { AxiosInstance } from "axios";
import { match } from "ts-pattern";

import { axiosInstance } from "@/libs/axios";

import {
  apiSchema,
  DeleteLogoutAdminSuccessResponse,
  GetAdminListSuccessResponse,
  GetVerifyAdminSuccessResponse,
  PostLoginAdminSuccessResponse,
  PutRenewAdminSuccessResponse,
  PutUpdateAdminSuccessResponse,
} from "./appApiSchema";
import {
  generateParams,
  initClient,
  responseError,
  responseOk,
  responsesOk,
} from "./handler";
import { CustomMetaQuery } from "./type";

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
      const { transformFilters, transformSorters, paginationMode, filterMode } =
        meta as CustomMetaQuery;
      const params = generateParams(filters, sorters, pagination, {
        transformFilters,
        transformSorters,
        paginationMode,
        filterMode,
      });

      return (
        match([resource])
          // Admins
          .with(["adminList"], () =>
            service
              .getAdminList<GetAdminListSuccessResponse>({ params })
              .then(responsesOk)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          GetListResponse<never>
        >
      );
    },

    create: async ({ resource, variables }) => {
      return (
        match([resource])
          // Authentications
          .with(["loginAdmin"], () =>
            service
              .postLoginAdmin<PostLoginAdminSuccessResponse>({
                data: variables,
              })
              .then(responseOk)
              .catch(responseError)
          )
          // Admins
          .with(["addAdmin"], () =>
            service
              .postAddAdminUser({ data: variables })
              .then(responseOk)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          CreateResponse<never>
        >
      );
    },

    update: async ({ resource, id, variables }) => {
      return (
        match([resource])
          // Authentications
          .with(["renewAdmin"], () =>
            service
              .putRenewAdmin<PutRenewAdminSuccessResponse>()
              .then(responseOk)
              .catch(responseError)
          )
          // Admins
          .with(["updateAdmin"], () =>
            service
              .putUpdateAdminUser<PutUpdateAdminSuccessResponse>({
                routeParams: {
                  id,
                },
                data: variables,
              })
              .then(responseOk)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          UpdateResponse<never>
        >
      );
    },

    getOne: async ({ resource, id }) => {
      return (
        match([resource])
          // Authentications
          .with(["verifyAdmin"], () =>
            service
              .getVerifyAdmin<GetVerifyAdminSuccessResponse>()
              .then(responseOk)
              .catch(responseError)
          )
          // Admins
          .with(["getAdminUser"], () =>
            service
              .getAdminUser({ routeParams: { id } })
              .then(responseOk)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          GetOneResponse<never>
        >
      );
    },

    deleteOne: async ({ resource }) => {
      return (
        match([resource])
          // Authentications
          .with(["logoutAdmin"], () =>
            service
              .deleteLogoutAdmin<DeleteLogoutAdminSuccessResponse>()
              .then(responseOk)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          DeleteOneResponse<never>
        >
      );
    },

    getApiUrl: () => {
      return apiUrl;
    },
  };
};
