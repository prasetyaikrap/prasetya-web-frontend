import { createSecretKey } from "crypto";
import * as Jose from "jose";

import { ENV } from "@/configs";
import InvariantError from "@/services/commons/exceptions/InvariantError";

export default class JwtTokenManager {
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

  async verifyAccessToken(token: string) {
    try {
      const secretKey = createSecretKey(
        ENV.JWT_SECRET_ACCESS_TOKEN_KEY,
        "utf-8"
      );
      return await this._jwt.jwtVerify(token, secretKey, {
        issuer: ENV.JWT_ISSUER,
        audience: ENV.JWT_AUDIENCE,
      });
    } catch (error) {
      throw new InvariantError("access token tidak valid");
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      const secretKey = createSecretKey(
        ENV.JWT_SECRET_REFRESH_TOKEN_KEY,
        "utf-8"
      );
      return await this._jwt.jwtVerify(token, secretKey, {
        issuer: ENV.JWT_ISSUER,
        audience: ENV.JWT_AUDIENCE,
      });
    } catch (error) {
      throw new InvariantError("refresh token tidak valid");
    }
  }
}
