const path = require("path");
const baseConfig = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
  entry: "./src/client/client.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "http://localhost:3000/",
    crossOriginLoading: "anonymous",
  },
});
