import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@learn-apps/shared"],
};

export default nextConfig;
