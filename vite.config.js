import path from 'path'
import { defineConfig, mergeConfig } from 'vite'
import trackerConfig from './vite.config.tracker'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from 'vite-plugin-singlefile'

const isDev = process.env.NODE_ENV !== 'production'

export const shareConfig = defineConfig({
    plugins: [svelte({
        configFile: path.resolve(__dirname, 'svelte.config.cjs')
    }), viteSingleFile(), {
        name: 'output-everything-to-dist',
        enforce: 'post',
        generateBundle(options, bundle) {
            for (const assetOfChunk of Object.values(bundle)) {
                assetOfChunk.fileName = path.basename(assetOfChunk.fileName)
            }
        }
    }],
    build: {
        emptyOutDir: false,
        rollupOptions: {
            output: {
                dir: 'dist'
            }
        }
    },
    root: 'entry',
    define: {
        __DEV__: isDev
    },
})

const indexConfig = mergeConfig(shareConfig, defineConfig({
    build: {
        rollupOptions: {
            input: {
                'index': 'entry/index.html',
            },
        },
    },
}))

// https://vitejs.dev/config/
export default isDev ? mergeConfig(indexConfig, trackerConfig) : indexConfig