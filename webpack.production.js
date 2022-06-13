const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const threeMinifier = new ThreeMinifierPlugin();

module.exports = merge(common, {
  plugins: [
    threeMinifier, // Minifies our three.js code
    new CleanWebpackPlugin(), // Cleans our 'dist' folder between builds
  ],
  resolve: {
    plugins: [threeMinifier.resolver],
  },
  mode: "production", // Minify our output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash:8].js", // Our output will have a unique hash, which will force our clients to download updates if they become available later
    sourceMapFilename: "[name].[fullhash:8].map",
    chunkFilename: "[id].[fullhash:8].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all", // Split our code into smaller chunks to assist caching for our clients
    },
  },
});
