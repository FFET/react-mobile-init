/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack dll config
 */

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    react: ["react", "react-dom", "redux", "react-redux", "redux-thunk", "react-router-dom"],
    ui: ["antd-mobile/lib/toast", "antd-mobile/lib/button"], // ant-mobile components
  },
  output: {
    path: path.join(__dirname, "../dll"),
    filename: "[name].dll.js",
    // library: "[name]_[hash]"
    library: "[name]_libary",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      //   name: "[name]_[hash]",
      name: "[name]_libary",
      path: path.join(__dirname, "../dll", "[name].manifest.json"),
    }),
  ],
  optimization: {
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      new TerserPlugin({
        terserOptions: {
          parallel: true,
          cache: true,
          compress: { warnings: true, drop_console: true },
          output: {
            comments: false,
            // comments: /Build in/i
          },
        },
        extractComments: false,
      }),
    ],
  },
};
