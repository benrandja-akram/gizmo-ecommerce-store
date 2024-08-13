import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entryPoints: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  external: [],
  ...options,
}))
