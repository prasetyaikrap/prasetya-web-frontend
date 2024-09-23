import { z } from "zod";

export const BaseSuccessResponse = z
  .object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({}).passthrough().optional(),
    metadata: z
      .object({
        total_rows: z.number().int().optional().default(0),
        total_page: z.number().int().optional().default(0),
        curent_page: z.number().int().optional().default(1),
        per_page: z.number().int().optional().default(1),
      })
      .passthrough(),
  })
  .passthrough();

export const BaseErrorResponse = z
  .object({
    success: z.boolean(),
    message: z.string(),
    error: z.object({}).passthrough().optional(),
  })
  .passthrough();

export const apiSchema = {
  postLoginAdmin: {
    method: "POST",
    path: "/authentications",
    summary: "Login Admin",
    payload: z
      .object({ username: z.string(), password: z.string() })
      .passthrough(),
    response: {
      success: BaseSuccessResponse.and(
        z.object({
          success: z.boolean(),
          message: z.string(),
          data: z
            .object({
              accessToken: z.string(),
              refreshToken: z.string(),
            })
            .passthrough(),
        })
      ),
      failed: BaseErrorResponse,
    },
  },
};

export type AppAPISchema = typeof apiSchema;

export type PLoginAdmin = z.infer<AppAPISchema["postLoginAdmin"]["payload"]>;
export type PostLoginAdminSuccessResponse = z.infer<
  AppAPISchema["postLoginAdmin"]["response"]["success"]
>;
export type PostLoginAdminErrorResponse = z.infer<
  AppAPISchema["postLoginAdmin"]["response"]["failed"]
>;
