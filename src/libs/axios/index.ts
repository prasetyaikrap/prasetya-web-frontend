import type { HttpError } from "@refinedev/core";
import axios, { AxiosError, AxiosInstance } from "axios";

import { ENV } from "@/configs";
import { COOKIES } from "@/configs/cookies";
import { getCookies, setCookies } from "@/utils";

import {
  appApiSchema,
  PutRenewAdminSuccessResponse,
} from "../providers/dataProvider/appApiSchema";
import { initClient } from "../providers/dataProvider/handler";

type ExtendedAxiosError = {
  config: {
    _retry: boolean;
  };
} & AxiosError;

function defaultRequestInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (config.headers !== undefined) {
        const [accessTokenCookie] = await getCookies([COOKIES.accessToken]);

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
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest?._retry &&
        originalAccessToken
      ) {
        originalRequest._retry = true;

        try {
          const {
            data: {
              data: { accessToken, accessTokenKey },
            },
          } = await authService.putRenewAdmin<PutRenewAdminSuccessResponse>();
          originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
          await axiosInstance(originalRequest);
          await setCookies([
            {
              name: accessTokenKey,
              path: "/",
              value: accessToken,
              httpOnly: true,
              secure: true,
            },
          ]);
        } catch (error) {
          window.location.replace("/admin/login");
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
