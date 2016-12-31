var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/main.js",
    detector: "./src/detector.js",
    background: "./src/background.js",
    popup: "./src/popup.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: './build'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/extension/**', to: './', flatten: true },
      { from: './resources/*.png', to: './', flatten: true },
      { from: './resources/apps/**', to: './apps', flatten: true },
    ])
  ]
};
