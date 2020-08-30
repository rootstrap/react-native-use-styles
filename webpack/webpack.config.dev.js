const Path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  entry: {
    app: Path.resolve(__dirname, "../demo/scripts/index.js"),
  },
  mode: "development",
  devtool: "source-map",
  output: {
    chunkFilename: "js/[name].chunk.js",
  },
  devServer: {
    inline: true,
    hot: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../demo/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, ".."),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, ".."),
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader?sourceMap=true", "sass-loader"],
      },
    ],
  },
});
