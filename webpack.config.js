var path = require('path');

module.exports = {
  entry: './js/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: "babel-loader" }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
