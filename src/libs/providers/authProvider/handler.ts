import { AuthActionResponse, CheckResponse, HttpError } from "@refinedev/core";

import { ENV } from "@/configs";
import { FormLoginFields } from "@/features/Login/type";
import { deleteCookies, setCookies } from "@/utils";

import { initRestClient } from "../dataProvider/handler";
import {
  AuthenticationLoginResponse,
  AuthenticationLogoutResponse,
  defaultAppApi,
} from "../dataProvider/schema";

const service = initRestClient({
  router: defaultAppApi,
  baseUrl: `${ENV.APP_HOST}/api`,
});

export async function loginAdminUser(
  payload: FormLoginFields,
  redirectPath?: string
): Promise<AuthActionResponse> {
  const { username, password } = payload;
  try {
    const { body: responseBody } = await service.postLoginAdmin({
      body: { username, password },
    });

    const {
      data: { accessToken, accessTokenKey, refreshToken, refreshTokenKey },
    } = responseBody as AuthenticationLoginResponse;

    await setCookies([
      {
        name: accessTokenKey,
        value: accessToken,
      },
      {
        name: refreshTokenKey,
        value: refreshToken,
      },
    ]);

    return {
      success: true,
      redirectTo: redirectPath || "/admin",
      successNotification: {
        message: "Login Successfull",
        description: `Welcome ${username}`,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error as HttpError,
    };
  }
}

export async function verifyAdminUser(): Promise<CheckResponse> {
  try {
    await service.getVerifyAdmin();
    return {
      authenticated: true,
    };
  } catch (error) {
    return {
      authenticated: false,
      redirectTo: "/admin/login",
      error: error as HttpError,
    };
  }
}

export async function logoutAdminUser(
  redirectPath: string
): Promise<AuthActionResponse> {
  try {
    const { body: responseBody } = await service.deleteLogoutAdmin();
    const {
      data: { accessTokenKey, refreshTokenKey },
    } = responseBody as AuthenticationLogoutResponse;
    await deleteCookies([accessTokenKey, refreshTokenKey]);

    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Logout Successful",
        description: "You have successfully logged out.",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error as HttpError,
    };
  }
}
