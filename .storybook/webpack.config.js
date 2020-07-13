/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack dev config
 */

const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.config.js");
// 引入暴露出去的配置文件
const { Options } = require("../config/dev");

module.exports = merge(common, {
  devtool: Options.devtool || "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
  // devServer: {
  //   contentBase: path.join(__dirname, Options.contentBase),
  //   publicPath: Options.publicPath || "/",
  //   historyApiFallback: {
  //     index: Options.publicPath || "/",
  //   },
  //   compress: true,
  //   host: "0.0.0.0",
  //   port: Options.port || 9000,
  //   useLocalIp: true,
  //   hot: true,
  //   hotOnly: true,
  //   open: true,
  //   disableHostCheck: true,
  //   overlay: {
  //     warnings: true,
  //     errors: true,
  //   },
  // },
});
