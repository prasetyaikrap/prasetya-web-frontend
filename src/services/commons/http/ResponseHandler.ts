import { NextResponse } from "next/server";

import { BaseResponseBody } from "../types/general";

export type ResponseProps<TBody extends BaseResponseBody = BaseResponseBody> = {
  data?: TBody;
  message?: string;
  code?: number;
  error?: Error;
  metadata?: ResponseMetadata | null;
};

export type ResponseMetadata = {
  total_rows: number;
  current_page: number;
  total_page: number;
  per_page: number;
};

export function SuccessResponse<T extends BaseResponseBody = BaseResponseBody>({
  data,
  code = 200,
  message = "",
  metadata,
}: ResponseProps<T>) {
  return NextResponse.json(
    { success: true, message, data, metadata },
    { status: code }
  );
}

export function ErrorResponse<T extends BaseResponseBody = BaseResponseBody>({
  message = "",
  code = 400,
  error,
  metadata = null,
}: ResponseProps<T>) {
  return NextResponse.json(
    { success: false, message, error, data: null, metadata },
    { status: code }
  );
}
