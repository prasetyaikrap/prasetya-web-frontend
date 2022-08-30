/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    FAPIKEY: process.env.FAPIKEY,
    FAUTHDOMAIN: process.env.FAUTHDOMAIN,
    FPROJECTID: process.env.FPROJECTID,
    FSTORAGEBUCKET: process.env.FSTORAGEBUCKET,
    FMESSAGINGSENDERID: process.env.FMESSAGINGSENDERID,
    FAPPID: process.env.FAPPID,
    FMEASUREMENTID: process.env.FMEASUREMENTID,
    SPINNOVID_APPKEY: process.env.SPINNOVID_APPKEY,
  },
  images: {
    domains: ["drive.google.com", "firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
