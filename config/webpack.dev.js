const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
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
              config: {
                path: './config/',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./sources/scss/modules/_variables.scss'],
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './sources/templates/index.pug',
      filename: 'index.html',
      file: require('../sources/data/index.json'),
      ga: '',
      gtm: '',
      mode: 'development'
    })
  ]
});
