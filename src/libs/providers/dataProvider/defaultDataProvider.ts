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
  initRestClient,
  responseError,
  responseOk,
  responsesOk,
} from "./handler";
import {
  AdministratorCreatePayload,
  AdministratorUpdatePayload,
  ArticleCreatePayload,
  ArticleUpdatePayload,
  ArticleUpdateStatusPayload,
  AuthenticationLoginPayload,
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
  const service = initRestClient({
    router: defaultAppApi,
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

      return match<BaseParamsMatcher>({ resource })
        .with({ resource: "adminList" }, () =>
          service
            .getAdminList({ query: params })
            .then(responsesOk)
            .catch(responseError)
        )
        .with({ resource: "articleList" }, () =>
          service
            .getArticleList({ query: params })
            .then(responsesOk)
            .catch(responseError)
        )
        .with({ resource: "articleListPublic" }, () =>
          service
            .getArticleListPublic({ query: params })
            .then(responsesOk)
            .catch(responseError)
        )
        .otherwise(() => Promise.reject("Method not implemented")) as Promise<
        GetListResponse<never>
      >;
    },

    create: async ({ resource, variables }) => {
      return match<BaseParamsMatcher>({ resource })
        .with({ resource: "loginAdmin" }, () =>
          service
            .postLoginAdmin({
              body: variables as AuthenticationLoginPayload,
            })
            .then(responseOk)
            .catch(responseError)
        )
        .with({ resource: "addAdmin" }, () =>
          service
            .postCreateAdmin({ body: variables as AdministratorCreatePayload })
            .then(responseOk)
            .catch(responseError)
        )
        .with({ resource: "createArticle" }, () =>
          service
            .postCreateArticle({ body: variables as ArticleCreatePayload })
            .then(responseOk)
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
            service.putRenewAdmin().then(responseOk).catch(responseError)
          )
          // Admins
          .with({ resource: "updateAdmin" }, () =>
            service
              .putUpdateAdmin({
                params: { id: id as string },
                body: variables as AdministratorUpdatePayload,
              })
              .then(responseOk)
              .catch(responseError)
          )
          .with({ resource: "updateArticle" }, () =>
            service
              .putUpdateArticle({
                params: { id: id as string },
                body: variables as ArticleUpdatePayload,
              })
              .then(responseOk)
              .catch(responseError)
          )
          .with({ resource: "updateArticleStatus" }, () =>
            service
              .putUpdateArticleStatus({
                params: { id: id as string },
                body: variables as ArticleUpdateStatusPayload,
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
        match<BaseParamsMatcher>({ resource })
          // Authentications
          .with({ resource: "verifyAdmin" }, () =>
            service.getVerifyAdmin().then(responseOk).catch(responseError)
          )
          // Admins
          .with({ resource: "getAdminUser" }, () =>
            service
              .getAdmin({ params: { id: id as string } })
              .then(responseOk)
              .catch(responseError)
          )
          .with({ resource: "getArticle" }, () =>
            service
              .getArticle({ params: { id: id as string } })
              .then(responseOk)
              .catch(responseError)
          )
          .with({ resource: "getArticlePublic" }, () =>
            service
              .getArticlePublic({ params: { id: id as string } })
              .then(responseOk)
              .catch(responseError)
          )
          .otherwise(() => Promise.reject("Method not implemented")) as Promise<
          GetOneResponse<never>
        >
      );
    },

    deleteOne: async ({ resource, id }) => {
      return (
        match<BaseParamsMatcher>({ resource })
          // Authentications
          .with({ resource: "logoutAdmin" }, () =>
            service.deleteLogoutAdmin().then(responseOk).catch(responseError)
          )
          .with({ resource: "articleDelete" }, () =>
            service
              .deleteDeleteArticle({ params: { id: id as string } })
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
