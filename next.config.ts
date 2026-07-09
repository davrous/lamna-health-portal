import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a self-contained server bundle (.next/standalone) so the
  // production Docker image can run with `node server.js` and a minimal
  // set of node_modules. Used by the container build for Azure.
  output: "standalone",
  // Trace files from this project directory (avoids picking up an unrelated
  // lockfile elsewhere on the machine, e.g. ~/package-lock.json).
  outputFileTracingRoot: __dirname,
  // Pin the workspace root to this project so Turbopack ignores unrelated
  // lockfiles elsewhere on the machine (e.g. ~/package-lock.json).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
