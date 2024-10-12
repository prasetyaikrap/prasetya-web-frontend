export type AdminDocProps = {
  id: string;
  username: string;
  hash_password: string;
  name: string;
  email: string;
  avatar: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
};

export type AuthenticationDocProps = {
  userId: string;
  refreshTokens: string[];
};

export type MetadataTotalRowsDocProp = Record<string, number>;
