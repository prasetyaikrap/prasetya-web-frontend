export type UserProfileData = {
  id: string;
  name: string;
  email: string;
  permissions: ["p" | "g", string, string, string][];
};
