import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use '@/styles/typography.scss' as *;`,
  },
};

export default nextConfig;
