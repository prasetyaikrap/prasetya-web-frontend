import { JWTPayload } from "jose";

export type AuthTokenPayload = {
  profile: {
    id: string;
    username: string;
  };
  userAgent: string;
} & JWTPayload;
