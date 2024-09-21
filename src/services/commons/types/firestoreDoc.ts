export type AdminDocProps = {
  id: string;
  username: string;
  hashPassword: string;
  name: string;
  email: string;
  avatar: string;
  permissions: ["p" | "g", string, string, string][];
  createdAt: string;
  updatedAt: string;
};

export type AuthenticationDocProps = {
  userId: string;
  refreshTokens: string[];
};
