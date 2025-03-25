import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  env: {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
