import { NextResponse } from "next/server";
import { BaseResponseBody } from "../types/general";

export type ResponseProps<TBody extends BaseResponseBody = BaseResponseBody> = {
  data?: TBody;
  message?: string;
  code?: number;
  error?: Error;
};

export function SuccessResponse<T extends BaseResponseBody = BaseResponseBody>({
  data,
  code = 200,
  message = "",
}: ResponseProps<T>) {
  return NextResponse.json({ success: true, message, data }, { status: code });
}

export function ErrorResponse<T extends BaseResponseBody = BaseResponseBody>({
  message = "",
  code = 400,
  error,
}: ResponseProps<T>) {
  return NextResponse.json(
    { success: false, message, error, data: null },
    { status: code }
  );
}
