import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite / to /news internally
        {
          source: '/',
          destination: '/news',
        },
      ],
    };
  },
};

export default nextConfig;