const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // <-- теперь всё правильно
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
