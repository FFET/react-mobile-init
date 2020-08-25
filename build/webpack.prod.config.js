/* eslint-disable no-unused-vars */
/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack prod config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ZipPlugin = require("zip-webpack-plugin");
const CloudStorageWebpackPlugin = require("cloud-storage-webpack-plugin");
const common = require("./webpack.base.config.js");
// 引入暴露出去的配置文件
const { Options } = require("../config/dev");

module.exports = merge(common, {
  output: {
    filename: "js/[name].[contenthash:6].js",
    chunkFilename: "js/[name].[contenthash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "image/[hash:6].[ext]",
              // outputPath: "image/",
              // publicPath: ".."
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: "..",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:4].css",
      chunkFilename: "css/[name].[contenthash:4].css",
    }),
    // Analyzer bundle
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 9999
    // }),
    // new webpack.BannerPlugin("Build in " + new Date().toLocaleString())
    // zip
    new ZipPlugin({
      path: "../",
      pathPrefix: "mobile",
      filename: "mobile.zip",
    }),
    // cloud storage
    // new CloudStorageWebpackPlugin({
    //   prefix: "react",
    //   cos: {
    //     SecretId: "",
    //     SecretKey: "",
    //     Bucket: "",
    //     Region: ""
    //   }
    // })
  ],
  optimization: {
    runtimeChunk: {
      name: "mainfest",
    },
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
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      //   minSize: 30000,
      //   maxSize: 300000,
      maxInitialRequests: 5,
      automaticNameDelimiter: ".",
      name: false, // vender
      cacheGroups: {
        // vendor: {
        //   test: /node_modules/,
        //   chunks: "initial",
        //   name: "vendor",
        //   priority: 10,
        //   enforce: true
        // },
        // packaged css in one file
        styles: {
          name: "styles",
          test: /\.(less|css|scss)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        // moment: {
        //   chunks: "initial",
        //   test: /[\\/]node_modules[\\/]moment/,
        //   //   test: /node_modules\/moment/,
        //   name: "moment",
        //   priority: -9,
        //   enforce: true
        // },
        vendor: {
          chunks: "initial",
          test: /node_modules/,
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
    // mobile: {
    //   test: /node_modules\/antd-mobile/,
    //   chunks: "initial",
    //   name: "mobile",
    //   priority: 10,
    //   enforce: true
    // }
  },
});
