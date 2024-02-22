/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@headlessui/react',
      'lucide-react',
      '@heroicons/react',
    ],
  },
}

export default nextConfig
