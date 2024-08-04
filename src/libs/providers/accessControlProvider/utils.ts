import { MemoryAdapter, newEnforcer } from "casbin.js";

import { ENV } from "@/configs";
import { UserProfileData } from "@/types";

import { generalCasbinModel } from "./constant";
import type { EnforcerParams } from "./type";

export function getDomainUserPermissions(
  permissions: UserProfileData["permissions"]
) {
  return permissions.filter((permission) => {
    const index = permission[0] === "p" ? 2 : 3;
    return permission[index] === ENV.APP_DOMAIN;
  });
}

export function getPolicyAdapter(permissions: UserProfileData["permissions"]) {
  const policy = permissions.reduce((result: string, subject: string[]) => {
    const str = subject.join(", ");
    return `${result}${str}\n`;
  }, ``);

  return new MemoryAdapter(policy);
}

export async function casbinEnforcer(
  permissions: UserProfileData["permissions"],
  enforcerParams: EnforcerParams
) {
  const { subject, object, action } = enforcerParams;
  const userDomainPermission = getDomainUserPermissions(permissions);
  const policyAdapter = getPolicyAdapter(userDomainPermission);

  const csbnEnforcer = await newEnforcer(generalCasbinModel, policyAdapter);

  return csbnEnforcer.enforce(subject, ENV.APP_DOMAIN, object, action);
}
