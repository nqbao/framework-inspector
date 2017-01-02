var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/main.js",
    detector: "./src/detector.js",
    background: "./src/background.js",
    popup: "./src/popup.js",
    devtools: "./src/devtools.js",
    framework_pane: "./src/framework_pane.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: './build'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './resources/*.png', to: './', flatten: true },
      { from: './resources/extension/**', to: './', flatten: true },
      { from: './resources/apps/**', to: './apps', flatten: true },
    ])
  ]
};
