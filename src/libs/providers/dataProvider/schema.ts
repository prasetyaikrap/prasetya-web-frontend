import { z } from "zod";

import {
  contract as defaultAppApi,
  schemas as defaultAppSchemas,
} from "./api/api-app.gen";

// schemas
export type AppAPISchema = typeof defaultAppSchemas;

export type AuthenticationLoginPayload = z.infer<
  AppAPISchema["AuthenticationLoginPayload"]
>;
export type AuthenticationLoginResponse = z.infer<
  AppAPISchema["AuthenticationLoginResponse"]
>;
export type AuthenticationRenewResponse = z.infer<
  AppAPISchema["AuthenticationRenewResponse"]
>;
export type AuthenticationLogoutResponse = z.infer<
  AppAPISchema["AuthenticationLogoutResponse"]
>;

export type AdministratorCreatePayload = z.infer<
  AppAPISchema["AdministratorCreatePayload"]
>;
export type AdministratorUpdatePayload = z.infer<
  AppAPISchema["AdministratorUpdatePayload"]
>;

export type ArticleCreatePayload = z.infer<
  AppAPISchema["ArticleCreatePayload"]
>;
export type ArticleUpdatePayload = z.infer<
  AppAPISchema["ArticleUpdatePayload"]
>;
export type ArticleUpdateStatusPayload = z.infer<
  AppAPISchema["ArticleUpdateStatusPayload"]
>;

export { defaultAppApi };
