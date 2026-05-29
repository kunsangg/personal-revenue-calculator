import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Vercel optimizes images automatically; no extra config required
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
