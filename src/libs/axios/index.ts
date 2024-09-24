import type { HttpError } from "@refinedev/core";
import axios, { AxiosError, AxiosInstance } from "axios";

import { ENV } from "@/configs";
import { COOKIES } from "@/configs/cookies";
import { deleteCookies, getCookies, setCookies } from "@/utils";

import {
  appApiSchema,
  DeleteLogoutAdminSuccessResponse,
  PutRenewAdminSuccessResponse,
} from "../providers/dataProvider/appApiSchema";
import { initClient } from "../providers/dataProvider/handler";

type ExtendedAxiosError = {
  config: {
    _retry: boolean;
    _isRenewToken: boolean;
  };
} & AxiosError;

function defaultRequestInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (config.headers !== undefined) {
        const [accessTokenCookie] = await getCookies([COOKIES.accessToken]);
        config.headers.set("ACCESS-CONTROL-allow-credentials");
        config.headers.set("X-Client-Id", ENV.APP_ID);
        config.headers.set("X-Client-Version", ENV.APP_VERSION);
        config.headers.set(
          "Authorization",
          `Bearer ${accessTokenCookie?.value || ""}`
        );
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function defaultResponseInterceptor(axiosInstance: AxiosInstance) {
  const authService = initClient({
    schema: appApiSchema,
    baseUrl: `${ENV.APP_HOST}/api`,
    httpClient: axiosInstance,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: ExtendedAxiosError) => {
      const originalRequest = error.config;
      const originalAuthorizationHeader =
        originalRequest?.headers.Authorization || "";
      const originalAccessToken = (originalAuthorizationHeader as string).split(
        "Bearer "
      )[1];
      const isRenewToken =
        originalRequest?.headers.get("X-Renew-Token")?.toString() === "true";

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest?._retry &&
        !isRenewToken &&
        originalAccessToken
      ) {
        originalRequest._retry = true;

        try {
          const {
            data: {
              data: { accessToken, accessTokenKey },
            },
          } = await authService.putRenewAdmin<PutRenewAdminSuccessResponse>({
            headers: {
              "X-Renew-Token": true,
            },
          });

          originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
          await setCookies([
            {
              name: accessTokenKey,
              value: accessToken,
            },
          ]);

          return await axiosInstance(originalRequest);
        } catch (err) {
          await deleteCookies(["pa_access_token", "pa_refresh_token"]);
          window.location.replace("/admin/login");

          return Promise.reject(err);
        }
      }

      const customError: HttpError = {
        ...error,
        message: (error.response?.data as any).message || "",
        statusCode: error.response?.status || 400,
      };

      return Promise.reject(customError);
    }
  );
}

function createAxios() {
  const axiosInstance = axios.create();

  defaultRequestInterceptor(axiosInstance);
  defaultResponseInterceptor(axiosInstance);

  return axiosInstance;
}

export const axiosInstance = createAxios();
