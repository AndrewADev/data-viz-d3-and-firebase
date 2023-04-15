import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        all: true,
        exclude: [
          ...configDefaults.coverage.exclude ?? [],
          '.size-limit.js',
          'ci/*',
        ]
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'cypress/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
