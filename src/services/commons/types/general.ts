import { JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

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
  userAgent: string;
} & JWTPayload;

export type HTTPHandlerProps = {
  request: NextRequest;
  context: RouteContext;
};

export type BaseResponseBody = {
  [key: string]: any;
};

export type BaseUseCasePayload<TPayload extends BaseKeyObject = BaseKeyObject> =
  {
    auth?: {
      accessToken?: string;
      refreshtoken?: string;
      clientId?: string;
      userAgent?: string;
    };
  };

export type RoutesHandler = {
  method: NextRequest["method"];
  path: string;
  handler: (props: HTTPHandlerProps) => Promise<NextResponse>;
  options?: any;
};
