"use server";

import { RouteContext } from "@/services/commons/types/general";
import { NextRequest } from "next/server";
import serviceContainer from "./container";
import { routeToRegex } from "@/services/commons/utils/general";
import InvariantError from "@/services/commons/exceptions/InvariantError";
import DomainErrorTranslator from "@/services/commons/exceptions/DomainErrorTranslator";
import ClientError from "@/services/commons/exceptions/ClientError";
import AuthenticationError from "@/services/commons/exceptions/AuthenticationError";
import AuthorizationError from "@/services/commons/exceptions/AuthorizationError";
import { ErrorResponse } from "@/services/commons/http/ResponseHandler";
import { match, P } from "ts-pattern";
import NotFoundError from "@/services/commons/exceptions/NotFoundError";

export async function serverHandler(
  request: NextRequest,
  context: RouteContext
) {
  const { version, endpoint: pathEndpoint } = context.params;
  const path = `/${version}/${pathEndpoint.join("/")}`;
  const method = request.method.toUpperCase();
  const routesContainer = await serviceContainer();

  try {
    const matchRoute = routesContainer.find((route) => {
      const { regex } = routeToRegex(route.path);
      const match = path.match(regex);
      const methodMatch = route.method === method;
      return Boolean(match && methodMatch);
    });

    if (!matchRoute) throw new NotFoundError("Resource Not Found");

    return await matchRoute.handler({ request, context });
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
