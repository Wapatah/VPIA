/*
  TODO extract common chunks from dev and production configs
  and use something like webpack-merge to put them all together for the environment needed
  Ref : http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
*/

const webpack = require("webpack");
const path = require("path");
let MainContainer = require("./config.json");

// @Matterwiki - TODO separate files for constants?
const BUILD_DIR = path.resolve(__dirname, "../client/public");
const APP_DIR = path.resolve(__dirname, "../client/components");
const USER_SERVICE = path.resolve(
  __dirname,
  "../../UserService/client/components"
);
const HISTORY_SERVICE = path.resolve(
  __dirname,
  "../../HistoryService/client/components"
);
const SEARCH_SERVICE = path.resolve(
  __dirname,
  "../../SearchService/client/components"
);
const WIKI_SERVICE = path.resolve(
  __dirname,
  "../../WikiService/client/components"
);

module.exports = {
  mode: "development",
  entry: [
    // React HMR specific stuff
    "react-hot-loader/patch",
    `webpack-hot-middleware/client?${MainContainer.URL}`,
    "webpack/hot/dev-server",

    "whatwg-fetch",

    // Entry point
    APP_DIR + "/index.jsx"
  ],
  output: {
    path: BUILD_DIR,
    publicPath: "/public/",
    filename: "bundle.js"
  },
  // Enabling sourcemaps for easier debugging
  devtool: "inline-source-map",
  // Again for react HMR
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
      },
      {
        test: /\.jsx?/,
        include: USER_SERVICE,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.jsx?/,
        include: HISTORY_SERVICE,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.jsx?/,
        include: SEARCH_SERVICE,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.jsx?/,
        include: WIKI_SERVICE,
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
