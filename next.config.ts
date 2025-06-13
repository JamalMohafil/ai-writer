import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // لكن هذا غير مدعوم
      },
      {
        protocol: 'http',
        hostname: '**', // لكن هذا غير مدعوم
      },
    ],
  },
  };

export default nextConfig;
