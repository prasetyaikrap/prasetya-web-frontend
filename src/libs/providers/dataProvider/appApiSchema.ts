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
    path: "/v1/authentications",
    summary: "Login Admin",
    payload: z
      .object({ username: z.string(), password: z.string() })
      .passthrough(),
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
            data: z
              .object({
                accessToken: z.string(),
                accessTokenKey: z.string(),
                refreshToken: z.string(),
                refreshTokenKey: z.string(),
              })
              .passthrough(),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },
  getVerifyAdmin: {
    method: "GET",
    path: "/v1/authentications",
    summary: "Verify Admin user from access token",
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
            data: z
              .object({
                accessToken: z.string(),
                accessTokenKey: z.string(),
              })
              .passthrough(),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },
  putRenewAdmin: {
    method: "PUT",
    path: "/v1/authentications",
    summary: "Renew access token of Admin user",
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
            data: z
              .object({
                accessToken: z.string(),
                accessTokenKey: z.string(),
              })
              .passthrough(),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },
  deleteLogoutAdmin: {
    method: "DELETE",
    path: "/v1/authentications",
    summary: "Logout Admin form session",
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },

  getAdminList: {
    method: "GET",
    path: "/v1/admins",
    summary: "Get List of Admins User",
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
            data: z.array(
              z
                .object({
                  id: z.string(),
                  username: z.string(),
                  name: z.string(),
                  email: z.string(),
                  avatar: z.string(),
                  permissions: z.array(z.array(z.string())),
                  created_at: z.string(),
                  updated_at: z.string(),
                })
                .passthrough()
            ),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },
  getAdminUser: {
    method: "GET",
    path: "/v1/admins/:id",
    summary: "Get Admin User Information",
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
            data: z
              .object({
                id: z.string(),
                username: z.string(),
                name: z.string(),
                email: z.string(),
                avatar: z.string(),
                permissions: z.array(z.array(z.string())),
                created_at: z.string(),
                updated_at: z.string(),
              })
              .passthrough(),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },
  postAddAdminUser: {
    method: "POST",
    path: "/v1/admins",
    summary: "Add new admin user",
    payload: z.object({
      username: z.string(),
      password: z.string(),
      name: z.string(),
      email: z.string(),
      avatar: z.string(),
      permissions: z.array(z.array(z.string())),
    }),
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
            data: z
              .object({
                id: z.string(),
              })
              .passthrough(),
          })
          .passthrough()
      ),
      failed: BaseErrorResponse,
    },
  },
  putUpdateAdminUser: {
    method: "PUT",
    path: "/v1/admins/:id",
    summary: "Add new admin user",
    payload: z.object({
      name: z.string(),
      email: z.string(),
      avatar: z.string(),
      permissions: z.array(z.array(z.string())),
    }),
    response: {
      success: BaseSuccessResponse.and(
        z
          .object({
            success: z.boolean(),
            message: z.string(),
          })
          .passthrough()
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
export type PutRenewAdminSuccessResponse = z.infer<
  AppAPISchema["putRenewAdmin"]["response"]["success"]
>;
export type GetVerifyAdminSuccessResponse = z.infer<
  AppAPISchema["getVerifyAdmin"]["response"]["success"]
>;
export type DeleteLogoutAdminSuccessResponse = z.infer<
  AppAPISchema["deleteLogoutAdmin"]["response"]["success"]
>;

export type PAddAdmin = z.infer<AppAPISchema["postAddAdminUser"]["payload"]>;
export type PostAddAdminSuccessResponse = z.infer<
  AppAPISchema["postAddAdminUser"]["response"]["success"]
>;
export type GetAdminListSuccessResponse = z.infer<
  AppAPISchema["getAdminList"]["response"]["success"]
>;
export type GetAdminUserSuccessResponse = z.infer<
  AppAPISchema["getAdminUser"]["response"]["success"]
>;
export type PUpdateAdmin = z.infer<
  AppAPISchema["putUpdateAdminUser"]["payload"]
>;
export type PutUpdateAdminSuccessResponse = z.infer<
  AppAPISchema["putUpdateAdminUser"]["response"]["success"]
>;
