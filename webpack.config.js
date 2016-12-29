module.exports = {
  entry: {
    main: "./src/main.js",
    detector: "./src/detector.js",
    background: "./src/background.js",
    popup: "./src/popup.js"
  },
  output: {
    filename: '[name].js',
    path: './build'
  }
}
