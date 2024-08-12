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
  external: ['next'],
  ...options,
}))
