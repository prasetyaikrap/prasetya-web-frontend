import { AuthActionResponse, CheckResponse, HttpError } from "@refinedev/core";

import { ENV } from "@/configs";
import { FormLoginFields } from "@/features/Login/type";
import { deleteCookies, setCookies } from "@/utils";

import { initClient } from "../dataProvider/handler";
import { defaultAppApi } from "../dataProvider/schema";

const service = initClient({
  contract: defaultAppApi,
  baseUrl: `${ENV.APP_HOST}/api`,
});

export async function loginAdminUser(
  payload: FormLoginFields,
  redirectPath?: string
): Promise<AuthActionResponse> {
  const { username, password } = payload;
  try {
    const {
      data: {
        data: { accessToken, accessTokenKey, refreshToken, refreshTokenKey },
      },
    } = await service.postLoginAdmin({
      data: { username, password },
    });

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
    const {
      data: {
        data: { accessTokenKey, refreshTokenKey },
      },
    } = await service.deleteLogoutAdmin();
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
