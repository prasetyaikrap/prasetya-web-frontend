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
  generateParams,
  initClient,
  responseError,
  responseOk,
  responsesOk,
} from "./handler";
import {
  AdministratorCreateResponse,
  AdministratorGetListResponse,
  AdministratorGetResponse,
  AdministratorUpdateResponse,
  AuthenticationLoginResponse,
  AuthenticationLogoutResponse,
  AuthenticationRenewResponse,
  AuthenticationVerifyResponse,
  defaultAppApi,
} from "./schema";
import { CustomMetaQuery } from "./type";

type BaseParamsMatcher = {
  resource: string;
  metadata?: Record<string, string | number>;
};

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "getMany" | "createMany" | "updateMany" | "deleteMany" | "custom"
> => {
  const service = initClient({
    contract: defaultAppApi,
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
        match<BaseParamsMatcher>({ resource })
          // Admins
          .with({ resource: "adminList" }, () =>
            service
              .getAdminList({ params })
              .then(responsesOk<AdministratorGetListResponse>)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          GetListResponse<never>
        >
      );
    },

    create: async ({ resource, variables }) => {
      return match<BaseParamsMatcher>({ resource })
        .with({ resource: "loginAdmin" }, () =>
          service
            .postLoginAdmin({
              data: variables,
            })
            .then(responseOk<AuthenticationLoginResponse>)
            .catch(responseError)
        )
        .with({ resource: "addAdmin" }, () =>
          service
            .postCreateAdmin({ data: variables })
            .then(responseOk<AdministratorCreateResponse>)
            .catch(responseError)
        )
        .otherwise(() => Promise.reject("Method not implemented")) as Promise<
        CreateResponse<never>
      >;
    },

    update: async ({ resource, id, variables }) => {
      return (
        match<BaseParamsMatcher>({ resource })
          // Authentications
          .with({ resource: "renewAdmin" }, () =>
            service
              .putRenewAdmin()
              .then(responseOk<AuthenticationRenewResponse>)
              .catch(responseError)
          )
          // Admins
          .with({ resource: "updateAdmin" }, () =>
            service
              .putUpdateAdmin({
                routeParams: {
                  id,
                },
                data: variables,
              })
              .then(responseOk<AdministratorUpdateResponse>)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          UpdateResponse<never>
        >
      );
    },

    getOne: async ({ resource, id }) => {
      return (
        match<BaseParamsMatcher>({ resource })
          // Authentications
          .with({ resource: "verifyAdmin" }, () =>
            service
              .getVerifyAdmin()
              .then(responseOk<AuthenticationVerifyResponse>)
              .catch(responseError)
          )
          // Admins
          .with({ resource: "getAdminUser" }, () =>
            service
              .getAdmin({ routeParams: { id } })
              .then(responseOk<AdministratorGetResponse>)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          GetOneResponse<never>
        >
      );
    },

    deleteOne: async ({ resource }) => {
      return (
        match<BaseParamsMatcher>({ resource })
          // Authentications
          .with({ resource: "logoutAdmin" }, () =>
            service
              .deleteLogoutAdmin()
              .then(responseOk<AuthenticationLogoutResponse>)
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
