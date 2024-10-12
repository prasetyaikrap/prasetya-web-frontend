"use server";

import { NextRequest } from "next/server";

import DomainErrorTranslator from "@/services/commons/exceptions/DomainErrorTranslator";
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
  const { routes: routesContainer, middleware } = await serviceContainer();

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

    const credentials = await middleware.execute({
      request,
      context,
      routeParams,
      route: matchRoute,
    });

    return await matchRoute.handler({
      request,
      context: { ...context, credentials },
      routeParams,
    });
  } catch (error) {
    // Translate error context
    const translatedError = DomainErrorTranslator.translate(error as Error);

    const errorResponse = ErrorResponse({
      message: translatedError?.message || "Unknown Error",
      error: translatedError,
      code: translatedError?.statusCode || 500,
    });
    return errorResponse;
  }
}
