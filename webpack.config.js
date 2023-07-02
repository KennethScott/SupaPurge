/**
 * @file webpack.config.js
 * @author Kenneth Scott
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const getSrcPath = (filePath) => {
  const src = path.resolve(__dirname, 'src');
  return path.posix.join(src.replace(/\\/g, '/'), filePath);
};

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: getSrcPath('/index.js'),
  output: {
    filename: `code.js`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/i,
        extractComments: false,
        terserOptions: {
          ecma: 2020,
          compress: true,
          mangle: {
            reserved: ['global'],
            keep_fnames: true, // Easier debugging in the browser
          },
          format: {
            comments: /@customfunction/i,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
  },
  watchOptions: {
    ignored: ['**/dist', '**/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
    }),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: getSrcPath('appsscript.json'),
          to: '[name][ext]',
        },
      ],
    }),
    new GasPlugin(),
  ],
};
