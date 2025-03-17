import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  env: {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    Test: "Hello World",
  },
};

export default nextConfig;
