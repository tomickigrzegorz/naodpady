const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function prodPlugin(plugin, mode) {
  return mode === 'production' ? plugin : () => {};
}

module.exports = (env, { mode }) => {
  const inDev = mode === 'development';
  return {
    devtool: inDev ? 'source-map' : 'none',
    mode: inDev ? 'development' : 'production',
    entry: {
      script: './sources/js/script.js',
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: './assets/js/script.[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.json$/,
          loader: 'file-loader',
          type: 'javascript/auto',
          options: {
            name() {
              return '[path][name].[ext]';
            },
          },
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            inDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      prodPlugin(
        new CleanWebpackPlugin({
          // dry: true,
          verbose: true,
        }),
        mode
      ),
      prodPlugin(
        new CopyPlugin([
          { from: 'trashlist/*.json', to: './' },
          { from: 'sources/assets/', to: 'assets/' },
          { from: 'sources/static/', to: 'static/' },
        ]),
        mode
      ),
      prodPlugin(
        new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
        }),
        mode
      ),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: './assets/css/style.[hash].css',
      }),
      new HtmlWebPackPlugin({
        template: './sources/index.html',
        minify: inDev
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
              // removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
      }),
      prodPlugin(
        new BundleAnalyzerPlugin({
          openAnalyzer: true,
        }),
        mode
      ),
    ],
  };
};
