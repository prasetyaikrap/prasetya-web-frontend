/** @type {import('next').NextConfig} */
export const nextConfig = {
  reactStrictMode: true,
  env: {
    MAILSENDER_SCRIPT_TOKEN: process.env.MAILSENDER_SCRIPT_TOKEN,
    GS_API_DEPLOYMENT_ID: process.env.GS_API_DEPLOYMENT_ID,
  },
  images: {
    domains: ["drive.google.com"],
  },
};
