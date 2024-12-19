import { JWTPayload, JWTVerifyResult } from "jose";
import { NextRequest, NextResponse, userAgent } from "next/server";

export type MiddlewareKeys = "authMiddleware";

export type BaseKeyObject = {
  [key: string]: string | number | string[] | number[];
};

export type BaseKey = string | number;

export type RouteContext<
  TParams extends RouteContextParams = RouteContextParams,
> = {
  params: TParams;
};

export type RouteContextParams = {
  version: string;
  endpoint: string[];
};

export type AuthTokenPayload = {
  profile: {
    id: string;
    username: string;
  };
  userAgent: ReturnType<typeof userAgent> | null;
} & JWTPayload;

export type HTTPHandlerProps = {
  request: NextRequest;
  context: {
    credentials: {
      accessToken: string;
      refreshToken: string;
      clientId: string;
      userAgent: ReturnType<typeof userAgent>;
      tokenPayload: JWTVerifyResult<AuthTokenPayload> | null;
    };
  } & RouteContext;
  routeParams: HTTPHandlerRouteParams;
};

export type HTTPHandlerRouteParams = { [key: string]: string };

export type BaseResponseBody = {
  [key: string]: any;
};

export type BaseUseCasePayload = {
  credentials: HTTPHandlerProps["context"]["credentials"];
};

export type RoutesHandler = {
  name: string;
  description?: string;
  method: NextRequest["method"];
  path: string;
  handler: (props: HTTPHandlerProps) => Promise<NextResponse>;
  options?: RoutesOption;
};

export type RoutesOption = {
  middleware?: MiddlewareKeys[];
};
