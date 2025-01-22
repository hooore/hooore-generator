import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  transpilePackages: ["@hooore/components", "@hooore/editor"],
};

export default nextConfig;
