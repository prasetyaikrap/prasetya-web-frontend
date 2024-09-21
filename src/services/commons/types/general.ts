import { JWTPayload } from "jose";
import { NextRequest, NextResponse, userAgent } from "next/server";

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
  context: RouteContext;
};

export type BaseResponseBody = {
  [key: string]: any;
};

export type BaseUseCasePayload = {
  auth?: {
    accessToken?: string;
    refreshToken?: string;
    clientId?: string;
    userAgent?: ReturnType<typeof userAgent>;
  };
};

export type RoutesHandler = {
  name: string;
  description?: string;
  method: NextRequest["method"];
  path: string;
  handler: (props: HTTPHandlerProps) => Promise<NextResponse>;
  options?: any;
};
