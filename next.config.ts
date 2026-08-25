import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  // `npm run build` performs strict type checking before Next compiles.
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Use the compiler API; npm 12 writes lifecycle notices into CLI output.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
