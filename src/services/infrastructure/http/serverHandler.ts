"use server";

import { NextRequest } from "next/server";
import { match, P } from "ts-pattern";

import AuthenticationError from "@/services/commons/exceptions/AuthenticationError";
import AuthorizationError from "@/services/commons/exceptions/AuthorizationError";
import ClientError from "@/services/commons/exceptions/ClientError";
import DomainErrorTranslator from "@/services/commons/exceptions/DomainErrorTranslator";
import InvariantError from "@/services/commons/exceptions/InvariantError";
import NotFoundError from "@/services/commons/exceptions/NotFoundError";
import { ErrorResponse } from "@/services/commons/http/ResponseHandler";
import {
  HTTPHandlerRouteParams,
  RouteContext,
} from "@/services/commons/types/general";
import { routeToRegex } from "@/services/commons/utils/general";

import serviceContainer from "./container";

export async function serverHandler(
  request: NextRequest,
  context: RouteContext
) {
  const { version, endpoint: pathEndpoint } = context.params;
  const path = `/${version}/${pathEndpoint.join("/")}`;
  const method = request.method.toUpperCase();
  const routesContainer = await serviceContainer();

  try {
    const routeParams: HTTPHandlerRouteParams = {};
    const matchRoute = routesContainer.find((route) => {
      const { regex, params } = routeToRegex(route.path);
      const match = path.match(regex);
      const methodMatch = route.method === method;
      const isMatch = Boolean(match && methodMatch);
      if (isMatch) {
        const paramsValue = match?.slice(1);
        params.forEach((p, idx) =>
          Object.assign(routeParams, { [p]: paramsValue?.[idx] || "" })
        );
      }
      return isMatch;
    });

    if (!matchRoute) throw new NotFoundError("Resource Not Found");

    return await matchRoute.handler({ request, context, routeParams });
  } catch (error) {
    // Translate error context
    const translatedError = DomainErrorTranslator.translate(error as Error);
    const errorCode = match(translatedError)
      .with(
        P.union(P.instanceOf(ClientError), P.instanceOf(InvariantError)),
        () => 400
      )
      .with(P.instanceOf(AuthenticationError), () => 401)
      .with(P.instanceOf(AuthorizationError), () => 403)
      .with(P.instanceOf(NotFoundError), () => 404)
      .otherwise(() => 500);

    const errorResponse = ErrorResponse({
      message: translatedError.message,
      error: translatedError,
      code: errorCode,
    });
    return errorResponse;
  }
}
