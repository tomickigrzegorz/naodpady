const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const configInstance = {
  ga: 'UA-156932720-1',
  gtm: 'GTM-T3CXNKJ'
}

// configure Copy
const configureCopy = () => {
  return {
    patterns: [
      { from: 'trashlist/*.json', to: './' },
      {
        from: 'sources/assets/', to: 'assets/', globOptions: {
          ignore: ['**/robots.txt', '**/.htaccess']
        }
      },
      { from: 'sources/assets/robots.txt', to: './' },
      { from: 'sources/assets/.htaccess', to: './' },
      { from: 'sources/static/', to: 'static/' },
    ]
  };
};

// configure WorkboxPlugin 
const cofigureWorkbox = () => {
  return {
    clientsClaim: true,
    skipWaiting: true,
    directoryIndex: 'index.html',
    offlineGoogleAnalytics: true,
    exclude: [
      /robots\.txt$/,
      /\.htaccess$/
    ]
    // include: [/\.html$/, /\.js$/, /\.css$/, /\.json$/, /\.png$/],
    // runtimeCaching: [
    //   {
    //     urlPattern: /.(?:html|js|css)$/,
    //     handler: "CacheFirst"
    //   }
    // ]
  };
};

// configure Outpu
const configureOutput = () => {
  return {
    path: path.resolve(__dirname, '../docs'),
    filename: './assets/js/[name].[contenthash].js',
  };
};

// configure Optimization
const configureOptimization = () => {
  return {
    splitChunks: {
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendor',
      //     chunks: 'initial'
      //   }
      // }
    },
    minimizer: [new TerserPlugin()]
  }
}

// configure MiniCssExtract
const configureMiniCssExtract = () => {
  return {
    filename: './assets/css/style.[contenthash].css'
  }
}

module.exports = merge(baseConfig, {
  mode: 'production',
  output: configureOutput(),
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ],
  },
  optimization: configureOptimization(),
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      verbose: true
    }),
    new MiniCssExtractPlugin(
      configureMiniCssExtract()
    ),
    new CopyWebpackPlugin(
      configureCopy()
    ),
    new HtmlWebPackPlugin({
      template: './sources/templates/index.pug',
      filename: 'index.html',
      file: require('../sources/data/index.json'),
      ga: configInstance.ga,
      gtm: configInstance.gtm,
      mode: 'production',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      type: 'production'
    }),
    // workbox musi byc dodanie jako ostatnie!!!
    new WorkboxPlugin.GenerateSW(
      cofigureWorkbox()
    ),
    new BundleAnalyzerPlugin({
      openAnalyzer: true
    })
  ]
});
