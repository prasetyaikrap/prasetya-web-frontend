export const ENV = {
  APP_HOST: process.env.APP_HOST ?? "http://localhost:3000",
  APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost:3000",
  FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ?? "",
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL ?? "",
  JWT_ISSUER: process.env.JWT_ISSUER ?? "",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? "",
  JWT_SECRET_ACCESS_TOKEN_KEY: process.env.JWT_SECRET_ACCESS_TOKEN_KEY ?? "",
  JWT_SECRET_REFRESH_TOKEN_KEY: process.env.JWT_SECRET_REFRESH_TOKEN_KEY ?? "",
};
