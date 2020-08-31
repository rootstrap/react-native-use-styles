const Path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    rnus: Path.resolve(__dirname, "../src/index.js"),
  },
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  output: {
    path: Path.join(__dirname, "../dist"),
    filename: "[name].js",
    library: "rnus",
    libraryTarget: "umd",
    globalObject: "this",
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
});
