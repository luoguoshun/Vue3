/*
 * @LastEditTime: 2023-03-10 15:47:54
 * @Descripttion:
 */
import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs'; // 文件处理库
import dotenv from 'dotenv'; //读取环境变量
import { resolve } from 'path';

// 更多配置浏览 https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig => {
  // 根据环境变量加载环境变量文件
  const ASR_ENV = dotenv.parse(fs.readFileSync(`.env.${mode}`));
  return {
    base: ASR_ENV.VITE_PUBLIC_PATH,
    server: {
      host: '127.0.0.1',
      port: 8080,
      https: false,
      proxy: {
        [ASR_ENV.VITE_BASE_API]: {
          target: `${ASR_ENV.VITE_TARGET_HOST}`,
          changeOrigin: true,
        },
        // '/api': {
        //   target: 'https://localhost:44365',
        //   changeOrigin: true,
        // },
      },
    },
    resolve: {
      //给文件路径设置别名
      alias: {
        '@': resolve(__dirname, './src'), // 源码根目录
        '@img': resolve('./src/assets/imgs'), // 图片
        '@less': resolve('./src/assets/less'), // 预处理器
        '@libs': resolve('./src/libs'), // 本地库
        '@plugins': resolve('./src/plugins'), // 本地插件
        '@cp': resolve('./src/components'), // 公共组件
        '@views': resolve('./src/views'), // 路由组件
      },
    },
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
    build: {
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用esbuild
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      chunkSizeWarningLimit: 1500,
    },
  };
});
