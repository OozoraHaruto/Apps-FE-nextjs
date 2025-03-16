import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  env: {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    Test: "Hello World",
  },
  sassOptions: {
    implementation: 'sass-embedded',
  },
};

export default nextConfig;
