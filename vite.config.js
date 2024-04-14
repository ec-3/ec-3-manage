import {fileURLToPath, URL} from 'node:url';
import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import autoprefixer from 'autoprefixer';

export default ({mode}) => {
    return defineConfig({
        base: "./",
        plugins: [
            vue(),
            vueJsx(),
            legacy({
                targets: ["ie >= 11"],
                additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
            }),
            AutoImport({
                resolvers: [
                    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                    ElementPlusResolver(),
                ],
            }),
            Components({
                resolvers: [
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver(),
                ],
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 3000,
            open: false,
            https: false,
            proxy: {
                // '/aaa': {
                //     target: 'https://cube-management.azurewebsites.net', // 目标服务器地址
                //     changeOrigin: true, // 是否改变源地址
                //     rewrite: (path) => path.replace(/^\/aaa/, "")
                // },
            }
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
