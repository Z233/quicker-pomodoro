import { shareConfig } from './vite.config'
import { defineConfig, mergeConfig } from 'vite'

// https://vitejs.dev/config/
export default mergeConfig(shareConfig, defineConfig({
  build: {
    rollupOptions: {
      input: {
        'tracker': 'entry/tracker.html',
      },
    },
  },
}))