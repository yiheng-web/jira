// craco.config.js

const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');

module.exports = {
  // 1. Less 插件配置
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': 'rgb(0,82,204)', 
              '@font-size-base': '16px' 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  
  // 2. Webpack 兼容性修复配置
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 核心兼容性修复：解决 Webpack 5 不支持旧版 `node` 字段的问题
      // 必须设置为 undefined，否则会报错 "configuration.node has an unknown property 'process'"
      webpackConfig.node = undefined; 
      
      // 排除 Antd 的 Source Map 检查，解决编译时的 Source Map 警告
           // 排除 Antd 的 Source Map 检查，解决编译时的 Source Map 警告
      const sourceMapRule = webpackConfig.module.rules.find(rule => 
        rule.loader && rule.loader.includes('source-map-loader')
      );

      if (sourceMapRule) {
        // 确保 sourceMapRule.exclude 始终是一个数组，再进行合并
        const existingExclude = Array.isArray(sourceMapRule.exclude) 
                              ? sourceMapRule.exclude
                              : (sourceMapRule.exclude ? [sourceMapRule.exclude] : []);
        
        // 覆盖新的排除项，包含 /node_modules/
        sourceMapRule.exclude = [
            ...existingExclude,
            /node_modules/
        ];
      }


      // Webpack 5 Polyfill 修复：使用 fallback 自动解析 Node 核心模块
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          "process": require.resolve("process/browser"),
          "buffer": require.resolve("buffer/"),
          "stream": require.resolve("stream-browserify"),
          "util": require.resolve("util/"),
          "url": require.resolve("url/"),
          "path": require.resolve("path-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "assert": require.resolve("assert/"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "crypto": require.resolve("crypto-browserify"),
        },
      };
      
      // 注入全局变量 (Process/Buffer) 以供旧代码或库使用
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser', 
          Buffer: ['buffer', 'Buffer'], 
        })
      );
      
      return webpackConfig;
    },
  },
};
