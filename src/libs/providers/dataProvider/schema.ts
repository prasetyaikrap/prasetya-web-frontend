import { z } from "zod";

import {
  contract as defaultAppApi,
  schemas as defaultAppSchemas,
} from "./api/api-app.gen";

// schemas
export type AppAPISchema = typeof defaultAppSchemas;

export type AuthenticationLoginResponse = z.infer<
  AppAPISchema["AuthenticationLoginResponse"]
>;
export type AuthenticationRenewResponse = z.infer<
  AppAPISchema["AuthenticationRenewResponse"]
>;
export type AuthenticationVerifyResponse = z.infer<
  AppAPISchema["AuthenticationVerifyResponse"]
>;
export type AuthenticationLogoutResponse = z.infer<
  AppAPISchema["AuthenticationLogoutResponse"]
>;

export type AdministratorCreateResponse = z.infer<
  AppAPISchema["AdministratorCreateResponse"]
>;
export type AdministratorGetListResponse = z.infer<
  AppAPISchema["AdministratorGetListResponse"]
>;
export type AdministratorGetResponse = z.infer<
  AppAPISchema["AdministratorGetResponse"]
>;
export type AdministratorUpdateResponse = z.infer<
  AppAPISchema["AdministratorUpdateResponse"]
>;

export { defaultAppApi };
