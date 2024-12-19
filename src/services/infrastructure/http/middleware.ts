import { JWTVerifyResult } from "jose";
import { NextRequest } from "next/server";

import {
  AuthTokenPayload,
  HTTPHandlerRouteParams,
  RouteContext,
  RoutesHandler,
} from "@/services/commons/types/general";
import { getCredentials } from "@/services/commons/utils/general";

import VerifyAdmin from "../repository/admins/entities/VerifyAdmin";
import ClientIdentityAuth from "../repository/authentications/entities/ClientIdentityAuth";
import AuthTokenManager from "../security/AuthTokenManager";

export type MiddlewareHandlerProps = {
  authTokenManager: AuthTokenManager;
};

export type MiddlewareHandlerPayload = {
  request: NextRequest;
  context: RouteContext;
  routeParams: HTTPHandlerRouteParams;
  route: RoutesHandler;
};

export default class MiddlewareHandlers {
  public _authTokenManager: AuthTokenManager;

  constructor({ authTokenManager }: MiddlewareHandlerProps) {
    this._authTokenManager = authTokenManager;
  }

  async execute({ request, route }: MiddlewareHandlerPayload) {
    const { accessToken, refreshToken, clientId, userAgent } = getCredentials({
      request,
    });
    const { options } = route;
    const { clientId: verifiedClientId } = new ClientIdentityAuth({ clientId });

    if (options?.middleware?.includes("authMiddleware")) {
      const result = new VerifyAdmin({ accessToken, refreshToken });
      const verifiedTokenPayload: JWTVerifyResult<AuthTokenPayload> =
        await this._authTokenManager.verifyAccessToken(result.accessToken);

      return {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        clientId: verifiedClientId,
        userAgent,
        tokenPayload: verifiedTokenPayload,
      };
    }

    return {
      accessToken,
      refreshToken,
      clientId: verifiedClientId,
      userAgent,
      tokenPayload: null,
    };
  }
}
