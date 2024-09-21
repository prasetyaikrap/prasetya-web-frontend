import { RouteContext } from "@/services/commons/types/general";
import { serverHandler } from "@/services/infrastructure/http/serverHandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: RouteContext) {
  return await serverHandler(request, context);
}
