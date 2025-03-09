import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['shopping-phinf.pstatic.net'],
  },
};

export default nextConfig;
