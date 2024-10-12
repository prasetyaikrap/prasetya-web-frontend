import { NextRequest } from "next/server";

import { RouteContext } from "@/services/commons/types/general";
import { serverHandler } from "@/services/infrastructure/http/serverHandler";

export async function GET(request: NextRequest, context: RouteContext) {
  return await serverHandler(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return await serverHandler(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return await serverHandler(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return await serverHandler(request, context);
}
