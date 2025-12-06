const CracoLessPlugin = require('craco-less');
const webpack = require('webpack'); // 👈 之前漏了这一行！
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(0,82,204), front-size-base: 16px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
 webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          process: 'process/browser', 
        }),
      ],
    },
  },
};