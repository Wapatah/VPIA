/*
  Production version of Webpack - this needs to be cleaned up and modernized. 
  We have updated Webpack and adjusted compatibility
*/
const webpack = require("webpack"); // eslint-disable-line
const path = require("path");
const Dotenv = require("dotenv-webpack");

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
  mode: "production",
  entry: [
    "babel-polyfill", //Polyfill enables use of ES6 (such as async) in all browsers
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
  resolve: {
    alias: {
      react: path.resolve("node_modules/react")
    }
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: false,
      systemvars: true
    })
  ]
};
