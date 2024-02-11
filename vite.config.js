import path from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    configFile: path.resolve(__dirname, 'svelte.config.cjs')
  }), viteSingleFile({
    useRecommendedBuildConfig: false
  }), {
    name: 'output-everything-to-dist',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const assetOfChunk of Object.values(bundle)) {
        assetOfChunk.fileName = path.basename(assetOfChunk.fileName)
      }
    }
  }],
  build: {
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    reportCompressedSize: false, 
    rollupOptions: {
      input: {
        'index': 'entry/index.html',
        'tracker': 'entry/tracker.html',
      },
      output: {
        dir: 'dist'
      }
    },
  },
  root: 'entry',
})
