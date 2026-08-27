import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  // Prevent an unrelated parent-directory lockfile from changing the project root.
  outputFileTracingRoot: process.cwd(),
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    // npm lifecycle notices can make Next's TypeScript CLI output unparsable.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
