import type { NextConfig } from "next";

// Export estatico: GitHub Pages sirve archivos, no un servidor Node.
// Esto prohibe route handlers, server actions, middleware e ISR.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
