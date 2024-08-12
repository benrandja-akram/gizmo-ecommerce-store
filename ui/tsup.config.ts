import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entryPoints: ['src/index.tsx'],
  format: ['esm'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
  dts: true,
  sourcemap: true,
  external: [
    'react',
    '@headlessui/react',
    'tailwind-merge',
    'clsx',
    'next',
    'lucide-react',
    'class-variance-authority',
  ],
  ...options,
}))
