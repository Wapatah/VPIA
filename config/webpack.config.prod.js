const webpack = require("webpack"); // eslint-disable-line
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "../client/public");
const APP_DIR = path.resolve(__dirname, "../client/app");

const { styles } = require("@ckeditor/ckeditor5-dev-utils");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = {
  mode: "production",
  entry: [
    // @Matterwiki - polyfill for fetch API (Safari)
    // TODO a better way to handle this, maybe?
    "whatwg-fetch",
    // @Matterwiki - entry point
    APP_DIR + "/index.jsx"
  ],
  performance: {
    hints: false // @Mordax - removes performance warning popups for now
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
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag"
            }
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
              },
              minify: true
            })
          }
        ]
      },
      {
        test: cssRegex,
        exclude: [cssModuleRegex, /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/]
        // (...)
      },
      {
        test: cssModuleRegex,
        exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/]
        // (...)
      },
      {
        loader: require.resolve("file-loader"),
        // Exclude `js` files to keep the "css" loader working as it injects
        // its runtime that would otherwise be processed through the "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpack's internal loaders.
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
        ],
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: []
};
