/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FAPIKEY: process.env.FAPIKEY,
    FAUTHDOMAIN: process.env.FAUTHDOMAIN,
    FPROJECTID: process.env.FPROJECTID,
    FSTORAGEBUCKET: process.env.FSTORAGEBUCKET,
    FMESSAGINGSENDERID: process.env.FMESSAGINGSENDERID,
    FAPPID: process.env.FAPPID,
    FMEASUREMENTID: process.env.FMEASUREMENTID,
  },
  images: {
    domains: ["drive.google.com", "firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
