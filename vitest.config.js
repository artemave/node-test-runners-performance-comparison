import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    isolate: false,
    include: ['./build/vitest/**/*.js'],
    watch: false,
  },
})
