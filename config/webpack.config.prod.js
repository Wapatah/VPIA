const webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "../client/public");
const APP_DIR = path.resolve(__dirname, "../client/app");

module.exports = {
  mode: "production",
  entry: [
    // @Matterwiki - polyfill for fetch API (Safari)
    // TODO a better way to handle this, maybe?
    "whatwg-fetch",
    // @Matterwiki - entry point
    APP_DIR + "/index.jsx"
  ],
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