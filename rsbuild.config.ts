import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginBabel } from '@rsbuild/plugin-babel';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    // 启用 React 插件，自动为当前工程配置 React 支持，包括 JSX/JSX transform、HMR、Fast Refresh 等特性
    pluginReact(),

    // 使用 Babel 插件，对源码进行自定义转换
    pluginBabel({
      babelLoaderOptions: {
        // 配置 Babel Loader 插件
        plugins: [
          [
            // 使用 relay Babel 插件，将 Relay GraphQL 查询编译成 artifacts，提升类型安全与性能
            'relay',
            {
              // 指定编译产物（artifacts）输出到 ./src/__generated__ 目录
              artifactDirectory: './src/__generated__',
            },
          ],
        ],
      },
    }),
  ],
});
