const { defineConfig } = require('@vue/cli-service');

// const path = require('path');

module.exports = defineConfig({
  // 1.配置方式一：CLI提供的属性
  transpileDependencies: true,
  outputDir: './build',
  // 2，配置方式二：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
      },
    },
    plugins: [],
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components',
  //   };
  // },
  // 3.配置方式三：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components');
  // 配置插件
  //  config.plugin('XXXXX').use("XXXX").tap(options=>{})
  // },
});
