/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baziszt.nuglobucket.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
