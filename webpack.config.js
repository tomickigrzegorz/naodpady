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

const configInstance = {
  title: 'naOdpady - Jak segregować śmieci?',
  description:
    '🗑 Jak segregować śmieci? Co gdzie wrzucać? Pojemniki BIO, Metale i tworzywa sztuczne, papier, szkło, zmieszane.',
  ga: 'UA-156932720-1',
  gtm: 'GTM-T3CXNKJ',
};

// configure Copy
const configureCopy = () => {
  return [
    { from: 'trashlist/*.json', to: './' },
    {
      from: 'sources/assets/',
      to: 'assets/',
      ignore: ['robots.txt', '.htaccess'],
    },
    { from: 'sources/static/', to: 'static/' },
  ];
};

// configure HtmlWebPackPlugin
const configureHtmlWebPack = inDev => {
  return {
    template: './sources/templates/index.pug',
    filename: 'index.html',
    // eslint-disable-next-line global-require
    file: require(`./sources/data/info.json`),
    title: configInstance.title,
    description: configInstance.description,
    // ga: configInstance.ga,
    // gtm: configInstance.gtm,
    ga: inDev ? '' : configInstance.ga,
    gtm: inDev ? '' : configInstance.gtm,
    type: !inDev,
    // hash: contenthash,
    minify: inDev
      ? false
      : {
          collapseWhitespace: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
  };
};

// configure WorkboxPlugin
const cofigureWorkbox = () => {
  return {
    clientsClaim: true,
    skipWaiting: true,
    directoryIndex: 'index.html',
    offlineGoogleAnalytics: true,
  };
};

// configure Outpu
const configureOutput = () => {
  return {
    path: path.resolve(__dirname, 'docs'),
    filename: './assets/js/script.[contenthash].js',
  };
};

// configure Entry
const configureEntry = () => {
  return {
    script: './sources/js/script.js',
  };
};

// configure BundleAnalyzerPlugin
const configureBundleAnalyzer = () => {
  return {
    openAnalyzer: true,
  };
};

module.exports = (env, { mode }) => {
  const inDev = mode === 'development';
  return {
    devtool: inDev ? 'source-map' : '',
    mode: inDev ? 'development' : 'production',
    entry: configureEntry(),
    output: configureOutput(),
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
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./sources/scss/modules/_variables.scss'],
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
            self: true,
          },
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
      prodPlugin(new CopyPlugin(configureCopy()), mode),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: './assets/css/style.[contenthash].css',
      }),
      new HtmlWebPackPlugin(configureHtmlWebPack(inDev)),
      prodPlugin(new WorkboxPlugin.GenerateSW(cofigureWorkbox()), mode),
      prodPlugin(new BundleAnalyzerPlugin(configureBundleAnalyzer()), mode),
    ],
  };
};
