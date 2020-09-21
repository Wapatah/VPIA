/*
  Production version of Webpack - this needs to be cleaned up and modernized. 
  We have updated Webpack and adjusted compatibility
*/
const webpack = require("webpack"); // eslint-disable-line
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "../client/public");
const APP_DIR = path.resolve(__dirname, "../client/components");

module.exports = {
  mode: "production",
  entry: [
    "whatwg-fetch",
    // Entry point
    APP_DIR + "/index.jsx"
  ],
  performance: {
    hints: false // Removes performance warning popups for now
  },
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
    publicPath: BUILD_DIR
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: []
};
