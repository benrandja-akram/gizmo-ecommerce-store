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
}

export default nextConfig
