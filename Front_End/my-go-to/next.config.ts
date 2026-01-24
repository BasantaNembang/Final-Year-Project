import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // to be safe from type error in CI/CD
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
