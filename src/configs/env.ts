export const ENV = {
  APP_HOST: process.env.NEXT_PUBLIC_APP_HOST ?? "http://localhost:3000",
  APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost:3000",
  FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ?? "",
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL ?? "",
  JWT_ISSUER: process.env.JWT_ISSUER ?? "",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? "",
  JWT_SECRET_ACCESS_TOKEN_KEY: process.env.JWT_SECRET_ACCESS_TOKEN_KEY ?? "",
  JWT_SECRET_REFRESH_TOKEN_KEY: process.env.JWT_SECRET_REFRESH_TOKEN_KEY ?? "",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? "dev-environment-v0.0.0",
  APP_ID: process.env.NEXT_PUBLIC_APP_ID ?? "",
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? "dev",
  GOOGLE_APP_SCRIPT_SECRET: process.env.GOOGLE_APP_SCRIPT_SECRET ?? "",
  GOOGLE_APP_SCRIPT_WEBAPP_URL: process.env.GOOGLE_APP_SCRIPT_WEBAPP_URL ?? "",
};
