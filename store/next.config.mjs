/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['ws'],
    optimizePackageImports: [
      '@headlessui/react',
      'lucide-react',
      '@heroicons/react',
    ],
  },
}

export default nextConfig
