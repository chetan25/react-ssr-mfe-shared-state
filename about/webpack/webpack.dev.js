const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const path = require("path");
const devConfig = {
  mode: "development",
  entry: {
    main: "./src/index.js", // no use for us
    aboutAppRoutes: "./src/exposeRoutes.js",
  },
  output: {
    publicPath: "http://localhost:3005/",
  },
  devtool: "source-map",
  devServer: {
    port: 3005,
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    // hot: true,
    // disableHostCheck: true,
    // host: '0.0.0.0',
    // // public: 'localhost:3001',
    // open: true,
    // // inline: true,
    // watchContentBase: true,
    // watchOptions: {
    //     aggregateTimeout: 500, // delay before reloading
    //     poll: 1000 // enable polling since fsevents are not supported in docker
    // }
    // historyApiFallback: {
    //     index: 'index.html'
    // }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "about",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./AboutApp": "./src/app",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-router-dom": { singleton: true, eager: true },
        "global-state": {
          import: "global-state",
          singleton: true,
          eager: true,
        },
      },
      // shared: packageJson.dependencies // optional way to list all dependencies as shared
    }),
  ],
};

// devConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, devConfig);
