import { createSecretKey } from "crypto";
import * as Jose from "jose";

import { ENV } from "@/configs";
import AuthenticationError from "@/services/commons/exceptions/AuthenticationError";

export type VerifyTokensProps = {
  accessToken: string;
  refreshToken: string;
};

export default class AuthTokenManager {
  public _jwt: typeof Jose;

  constructor(jwt: typeof Jose) {
    this._jwt = jwt;
  }

  async createAccessToken<TPayload extends Jose.JWTPayload = Jose.JWTPayload>(
    payload: TPayload,
    expirationTime: string = "1 day"
  ) {
    const secretKey = createSecretKey(ENV.JWT_SECRET_ACCESS_TOKEN_KEY, "utf-8");
    return await new this._jwt.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer(ENV.JWT_ISSUER)
      .setAudience(ENV.JWT_AUDIENCE)
      .setExpirationTime(expirationTime)
      .sign(secretKey);
  }

  async createRefreshToken<TPayload extends Jose.JWTPayload = Jose.JWTPayload>(
    payload: TPayload,
    expirationTime: string = "1 year"
  ) {
    const secretKey = createSecretKey(
      ENV.JWT_SECRET_REFRESH_TOKEN_KEY,
      "utf-8"
    );

    return await new this._jwt.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer(ENV.JWT_ISSUER)
      .setAudience(ENV.JWT_AUDIENCE)
      .setExpirationTime(expirationTime)
      .sign(secretKey);
  }

  async verifyAccessToken<TPayload extends Jose.JWTPayload = Jose.JWTPayload>(
    token: string
  ) {
    try {
      const secretKey = createSecretKey(
        ENV.JWT_SECRET_ACCESS_TOKEN_KEY,
        "utf-8"
      );
      return await this._jwt.jwtVerify<TPayload>(token, secretKey, {
        issuer: ENV.JWT_ISSUER,
        audience: ENV.JWT_AUDIENCE,
      });
    } catch (error) {
      throw new AuthenticationError("access token is not valid");
    }
  }

  async verifyRefreshToken<TPayload extends Jose.JWTPayload = Jose.JWTPayload>(
    token: string,
    failedCallback?: (token: string) => Promise<void>
  ) {
    try {
      const secretKey = createSecretKey(
        ENV.JWT_SECRET_REFRESH_TOKEN_KEY,
        "utf-8"
      );
      return await this._jwt.jwtVerify<TPayload>(token, secretKey, {
        issuer: ENV.JWT_ISSUER,
        audience: ENV.JWT_AUDIENCE,
      });
    } catch (error) {
      await failedCallback?.(token);
      throw new AuthenticationError("refresh token is not valid");
    }
  }

  decodeToken<TPayload extends Jose.JWTPayload = Jose.JWTPayload>(
    token: string
  ) {
    return this._jwt.decodeJwt<TPayload>(token);
  }
}
