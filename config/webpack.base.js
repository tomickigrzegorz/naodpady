const Dotenv = require('dotenv-webpack');

// Configure Babel loader
const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    }
  }
}

// Configure file loader
const configureJsonLoader = () => {
  return {
    test: /\.json$/,
    loader: 'file-loader',
    type: 'javascript/auto',
    options: {
      name() {
        return '[path][name].[ext]';
      }
    }
  }
}

// configure Pug Loader
const configurePugLoader = () => {
  return {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: {
      pretty: true,
      self: true,
    },
  }
}

// configure Entry
// const configureEntry = () => {
//   return {
//     script: 
//     // cookie: './sources/js/cookiebanner.min.js'
//   };
// };

module.exports = {
  entry: './sources/js/index.js',
  module: {
    rules: [
      configureBabelLoader(),
      configureJsonLoader(),
      configurePugLoader()
    ],
  },
  plugins: [
    new Dotenv()
  ]
};