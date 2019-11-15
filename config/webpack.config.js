/*
@Matterwiki
TODO extract common chunks from dev and production configs
and use something like webpack-merge to put them all together for the environment needed
Ref : http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
*/

const webpack = require("webpack");
const path = require("path");

// @Matterwiki - TODO separate files for constants?
const BUILD_DIR = path.resolve(__dirname, "../client/public");
const APP_DIR = path.resolve(__dirname, "../client/app");

const { styles } = require( "@ckeditor/ckeditor5-dev-utils" );

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = {
  mode: "production",
  entry: [
    // @Matterwiki - react HMR specific stuff
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?http://localhost:5000/",
    "webpack/hot/dev-server",

    // @Matterwiki - polyfill for fetch API (Safari), TODO a better way to handle this, maybe?
    "whatwg-fetch",

    // @Matterwiki - entry point
    APP_DIR + "/index.jsx"
  ],
  output: {
    path: BUILD_DIR,
    publicPath: "/public/",
    filename: "bundle.js"
  },
  // @Matterwiki - enabling sourcemaps for easier debugging
  devtool: "inline-source-map",
  // @Matterwiki - again for react HMR
  devServer: {
    hot: true,
    inline: true,
    contentBase: BUILD_DIR,
    publicPath: "/public/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
  }
};
