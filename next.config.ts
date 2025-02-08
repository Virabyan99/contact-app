import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['your-image-domain.com'], // Allowing images from an external domain
  },
  basePath: '/custom-base', // If you want a custom base path
  reactStrictMode: true, // Enabling React strict mode for additional warnings
  env: {
    customKey: 'your-custom-value', // Add environment variables
  },
}

export default nextConfig
