import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next ignores stray lockfiles
  // higher up the directory tree (e.g. in the user home folder).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
