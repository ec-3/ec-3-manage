import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/

export default ({mode}) => {
    return defineConfig({
        base: "./",
        plugins: [
            vue(),
            vueJsx(),
            VueDevTools(),
            legacy({
                targets: ["ie >= 11"],
                additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 8080,
            open: false,
            https: false,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "sass:math";
                        @import "@/assets/scss/variable.scss";
                        @import "@/assets/scss/mixin.scss";
                        @import "@/assets/scss/layout.scss";
                    `
                }
            },
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: [
                            '> 1%',
                            'last 2 versions',
                            'not ie <= 8',
                            'Android >= 4.1',
                            'iOS >= 8',
                        ],
                        grid: true,
                    }),
                ],
            }
        },
        build: {
            outDir: "dist",
            // 代码压缩配置
            terserOptions: {
                // 生产环境移除console
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            target: "es2015",
            rollupOptions: {
                output: {
                    chunkFileNames: "static/js/[name]-[hash].js",
                    entryFileNames: "static/js/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                },
            },
        },
    });
};
