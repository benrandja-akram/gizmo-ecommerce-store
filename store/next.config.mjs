/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['ws', '@neondatabase/serverless'],
    optimizePackageImports: [
      '@headlessui/react',
      'lucide-react',
      '@heroicons/react',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.licbplus.com',
      },
    ],
  },
}

export default nextConfig
