const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    app: Path.resolve(__dirname, "../src/lib/index.js"),
  },
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  output: {
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].chunk.js",
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
